import { spawn } from "node:child_process";
import { useEffect, useState } from "react";

function useSc() {
  pycode = `
  from bs4 import BeautifulSoup
  import requests
  
  def fon_bilgileri (fon_kodu):
      fon = {"kodu" : fon_kodu, "adi" : "", "son_fiyat":"","gunluk_getiri":"","kategori":"",
             "tefas_link":f"https://www.tefas.gov.tr/FonAnaliz.aspx?FonKod={fon_kodu}"}
      r = requests.get(fon["tefas_link"])
      soup = BeautifulSoup(r.content, "lxml")
      ull = soup.find("ul",attrs={"class":"top-list"})
      fon_adi = soup.find("span",attrs={"id":"MainContent_FormViewMainIndicators_LabelFund"})
      bilgi = []
      for li in ull.findAll('li'):
          bilgi.append(li.text.strip().split("\n"))
      fon["kategori"] =  bilgi[4][2]
      fon["son_fiyat"] =  bilgi[0][2]
      fon["gunluk_getiri"] =  bilgi[1][2]
      fon["adi"] =  fon_adi.text
      return fon
      
      print(fon_bilgileri("AEL"))`;
  

  const ls = spawn('python', ['-c', pycode]);
  ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });
}

export default useSc;
