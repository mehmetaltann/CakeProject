import * as cheerio from "cheerio";
import { useEffect, useState } from "react";

const useScrap = (name) => {
  const [data, setData] = useState({ title: "" });

  const url = `https://www.tefas.gov.tr/FonAnaliz.aspx?FonKod=AFT`;

  async function getData() {
    try {
      const response = await fetch(url, {
        mode: "no-cors",
      });
      if (!response.ok) {
        return response.text().then((text) => {
          throw new Error(text);
        });
      }

      const webData = await response.text();
      console.log(webData);
      const $ = cheerio.load(webData);
      const info = {
        title: $("p").text(),
      };
      setData(info);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return { data };
};

export default useScrap;

/*

useEffect(() => {
    fetch(url, { mode: "no-cors" })
      .then((response) => response.text())
      .then((data) => {
        const $ = cheerio.load(data);
        const info = {
          title: $("#MainContent_FormViewMainIndicators_LabelFund").text(),
        };
        console.log($("p:first"));
        setData(info);
      })
      .catch((err) => console.log(err));
  }, []);

  return { data };

*/
