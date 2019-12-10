import React, { useState, useEffect } from "react";

const FetchData = url => {
  const [loading, setLoading] = useState(true);
  const [dataState, setDataState] = useState({ data: [], priceRanges: [] });

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        fetch(url)
          .then(resp => resp.json())
          .then(function(d) {
            console.log(d._embedded.events[Object.keys("priceRanges")[5]]);
            setDataState({
              ...dataState,
              data: d._embedded.events,
              priceRanges: d._embedded.events.priceRanges
            });
            setLoading(false);
          });
      } catch (error) {
        console.error("an error has occurred");
        setLoading(false);
      }
    };
    fetchDataFromApi();
  }, []);

  return [dataState];
};

export default FetchData;
