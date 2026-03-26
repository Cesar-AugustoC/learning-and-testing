"""
Automação de download de relatórios do portal Supply Chain.

Fluxo:
  1. Abre o Chrome
  2. Navega até o link do Supply Chain
  3. Clica em "Employee Login"
  4. Seleciona o Management System "DPO"
  5. Seleciona o mês desejado
  6. Clica em "Visualizar em todos os DCs"
  7. Para cada DC, seleciona todos os pilares, clica em "Mais Ações" → "Exportar" → "Baixar Arquivo"
  8. Salva o arquivo na pasta <DC>_<mês>

Uso:
  python supply_chain_download.py --url <URL> --month <MES> [--download-dir <DIR>]

Exemplo:
  python supply_chain_download.py --url https://supplychain.example.com --month Janeiro
"""

import argparse
import os
import time

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from webdriver_manager.chrome import ChromeDriverManager


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def make_download_folder(base_dir: str, dc_name: str, month: str) -> str:
    """Cria (se necessário) e retorna o caminho da pasta de destino."""
    folder_name = f"{dc_name}_{month}"
    folder_path = os.path.join(base_dir, folder_name)
    os.makedirs(folder_path, exist_ok=True)
    return folder_path


def build_driver(download_dir: str) -> webdriver.Chrome:
    """Configura e retorna uma instância do ChromeDriver."""
    chrome_options = Options()
    chrome_options.add_experimental_option(
        "prefs",
        {
            "download.default_directory": os.path.abspath(download_dir),
            "download.prompt_for_download": False,
            "download.directory_upgrade": True,
            "safebrowsing.enabled": True,
        },
    )
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=chrome_options)
    driver.maximize_window()
    return driver


def wait_and_click(driver: webdriver.Chrome, locator, timeout: int = 15):
    """Aguarda um elemento ficar clicável e clica nele."""
    element = WebDriverWait(driver, timeout).until(
        EC.element_to_be_clickable(locator)
    )
    element.click()
    return element


def wait_for_element(driver: webdriver.Chrome, locator, timeout: int = 15):
    """Aguarda um elemento ficar visível e o retorna."""
    return WebDriverWait(driver, timeout).until(
        EC.visibility_of_element_located(locator)
    )


# ---------------------------------------------------------------------------
# Passos da automação
# ---------------------------------------------------------------------------

def login_employee(driver: webdriver.Chrome):
    """Clica no botão 'Employee Login'."""
    wait_and_click(driver, (By.XPATH, "//*[contains(text(), 'Employee Login')]"))


def select_management_system(driver: webdriver.Chrome, system: str = "DPO"):
    """Seleciona o Management System informado (padrão: DPO)."""
    wait_and_click(driver, (By.XPATH, f"//*[contains(text(), '{system}')]"))


def select_month(driver: webdriver.Chrome, month: str):
    """Seleciona o mês no seletor de período."""
    wait_and_click(driver, (By.XPATH, f"//*[contains(text(), '{month}')]"))


def click_view_all_dcs(driver: webdriver.Chrome):
    """Clica em 'Visualizar em todos os DCs'."""
    wait_and_click(
        driver,
        (By.XPATH, "//*[contains(text(), 'Visualizar em todos os DCs')]"),
    )


def get_dc_list(driver: webdriver.Chrome) -> list:
    """Retorna a lista de elementos de DC disponíveis na página."""
    WebDriverWait(driver, 15).until(
        EC.presence_of_all_elements_located((By.CSS_SELECTOR, "[data-dc-name]"))
    )
    return driver.find_elements(By.CSS_SELECTOR, "[data-dc-name]")


def select_all_pillars(driver: webdriver.Chrome):
    """Clica na opção 'Todos os Pilares' ou marca todos individualmente."""
    try:
        wait_and_click(
            driver,
            (By.XPATH, "//*[contains(text(), 'Todos os Pilares') or contains(text(), 'Selecionar todos')]"),
        )
    except Exception:
        # Caso não exista opção única, marca cada checkbox de pilar
        pillars = driver.find_elements(By.XPATH, "//input[@type='checkbox' and contains(@class, 'pilar')]")
        if not pillars:
            print("  Aviso: nenhum checkbox de pilar encontrado. Verifique o seletor CSS/XPath.")
        for pillar in pillars:
            if not pillar.is_selected():
                pillar.click()


def export_and_download(driver: webdriver.Chrome):
    """Clica em 'Mais Ações' → 'Exportar' → 'Baixar Arquivo'."""
    wait_and_click(
        driver,
        (By.XPATH, "//*[contains(text(), 'Mais Ações') or contains(text(), 'Mais ações')]"),
    )
    wait_and_click(
        driver,
        (By.XPATH, "//*[contains(text(), 'Exportar')]"),
    )
    wait_and_click(
        driver,
        (By.XPATH, "//*[contains(text(), 'Baixar Arquivo') or contains(text(), 'Baixar arquivo')]"),
    )


def wait_for_download(download_dir: str, timeout: int = 60):
    """Aguarda o download ser concluído na pasta informada."""
    deadline = time.time() + timeout
    while time.time() < deadline:
        files = os.listdir(download_dir)
        # Precisa ter pelo menos um arquivo e nenhum temporário do Chrome (.crdownload)
        if files and not any(f.endswith(".crdownload") for f in files):
            return True
        time.sleep(1)
    raise TimeoutError(f"Download não concluído em {timeout}s na pasta: {download_dir}")


# ---------------------------------------------------------------------------
# Fluxo principal
# ---------------------------------------------------------------------------

def run(url: str, month: str, base_download_dir: str, system: str = "DPO"):
    """Executa o fluxo completo de download para todos os DCs."""

    # Pasta base temporária para descobrir os DCs antes de mover os arquivos
    os.makedirs(base_download_dir, exist_ok=True)

    driver = build_driver(base_download_dir)
    try:
        # 1. Abre o portal
        driver.get(url)

        # 2. Employee Login
        login_employee(driver)

        # 3. Seleciona Management System
        select_management_system(driver, system)

        # 4. Seleciona o mês
        select_month(driver, month)

        # 5. Clica em "Visualizar em todos os DCs"
        click_view_all_dcs(driver)

        # 6. Obtém a lista de DCs
        dc_elements = get_dc_list(driver)
        dc_names = [
            " ".join((el.get_attribute("data-dc-name") or el.text).split())
            for el in dc_elements
        ]

        print(f"DCs encontrados: {dc_names}")

        for dc_name in dc_names:
            print(f"\nProcessando DC: {dc_name}")

            # Cria a pasta de destino para este DC/mês
            dest_folder = make_download_folder(base_download_dir, dc_name, month)

            # Reconfigura o diretório de download do Chrome para esta pasta
            driver.execute_cdp_cmd(
                "Page.setDownloadBehavior",
                {"behavior": "allow", "downloadPath": os.path.abspath(dest_folder)},
            )

            # Navega até o DC (clica no elemento correspondente)
            try:
                dc_element = driver.find_element(
                    By.XPATH, f"//*[@data-dc-name='{dc_name}' or contains(text(), '{dc_name}')]"
                )
                dc_element.click()
                # Aguarda a transição da página/painel do DC carregar
                time.sleep(1)
            except Exception as exc:
                print(f"  Aviso: não foi possível clicar no DC '{dc_name}': {exc}")
                continue

            # 7. Seleciona todos os pilares
            select_all_pillars(driver)

            # 8. Exporta e baixa o arquivo
            export_and_download(driver)

            # 9. Aguarda o download
            wait_for_download(dest_folder)
            print(f"  Download concluído em: {dest_folder}")

    finally:
        driver.quit()


# ---------------------------------------------------------------------------
# Entry-point
# ---------------------------------------------------------------------------

def parse_args():
    parser = argparse.ArgumentParser(
        description="Automação de download de relatórios do portal Supply Chain."
    )
    parser.add_argument(
        "--url",
        required=True,
        help="URL do portal Supply Chain (ex.: https://supplychain.example.com)",
    )
    parser.add_argument(
        "--month",
        required=True,
        help="Mês a ser selecionado (ex.: Janeiro, Fevereiro, …)",
    )
    parser.add_argument(
        "--download-dir",
        default=os.path.join(os.path.expanduser("~"), "Downloads", "SupplyChain"),
        help="Pasta base onde as subpastas <DC>_<mês> serão criadas (padrão: ~/Downloads/SupplyChain)",
    )
    parser.add_argument(
        "--system",
        default="DPO",
        help="Management System a selecionar (padrão: DPO)",
    )
    return parser.parse_args()


if __name__ == "__main__":
    args = parse_args()
    run(
        url=args.url,
        month=args.month,
        base_download_dir=args.download_dir,
        system=args.system,
    )
