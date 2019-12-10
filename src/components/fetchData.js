import { useState, useEffect } from "react";
import { className } from "postcss-selector-parser";

const FetchData = url => {
  const [loading, setLoading] = useState(true);
  const [dataState, setDataState] = useState({ data: [], priceRanges: [] });

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        await fetch(url)
          .then(resp => resp.json())
          .then(function(d) {
            setDataState({
              ...dataState,
              data: d._embedded.events,
              priceRanges: Object.values(d._embedded.events).map(item => {
                return item.priceRanges;
              })
            });
            setLoading(false);
          });
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchDataFromApi();
  }, []);

  return [dataState];
};

export default FetchData;
