import { useState, useEffect } from "react";

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
              data: d._embedded.events
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
