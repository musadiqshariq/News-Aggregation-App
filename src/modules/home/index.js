import React, { useEffect, useState } from "react";
import {
  NewsCard,
  NewsCardSkeleton,
  Pagination,
  TopCard,
} from "../../generalComponents";
import { useDispatch, useSelector } from "react-redux";
import {
  getSourcesListFromNewsApiAction,
  searchArcticlesFromNewsApiAction,
} from "./redux/actions";
import { Empty, Form } from "antd";
import { debounce } from "lodash";
import { CustomizationDrawer } from "../../generalComponents/customizationDrawer";

// Component to display and filter articles from News Feed
export const Home = () => {
  const dispatch = useDispatch(); // Dispatch for Redux actions
  const [filtersForm] = Form.useForm(); // AntD form instance for filters
  const [isLoading, setIsLoading] = useState(true); // Loading state for API calls
  const [searchStr, setSearchStr] = useState(""); // Search input state
  const { entities, sources, totalRecords } = useSelector(
    (state) => state.home
  ); // Data fetched from Redux state
  const [open, setOpen] = useState(false); // State to control the visibility of the filter drawer
  const [page, setPage] = useState(1);

  const source = localStorage.getItem("source");

  // Function to fetch articles with filters applied
  const getArticles = (onSuccess) => {
    setIsLoading(true); // Set loading state to true while fetching

    const source = localStorage.getItem("source");

    const query = `${`${searchStr ? `&q=${searchStr}` : ""}${
      source ? `&sources=${source}` : ""
    }`}`;

    // Dispatch the action to fetch articles
    dispatch(
      searchArcticlesFromNewsApiAction(query, page, setIsLoading, onSuccess)
    );
  };

  const saveCustomization = () => {
    const source = filtersForm.getFieldValue("source"); // Get selected source
    source && localStorage.setItem("source", source?.join(","));
    setPage(1);
    getArticles(() => {
      setOpen(false);
    });
  };

  // Handle opening of the filter drawer
  const handleOpen = () => {
    setOpen(true);
  };

  // Handle closing of the filter drawer
  const handleClose = () => {
    setOpen(false);
  };

  // Reset filters and fetch articles
  const onFiltersReset = () => {
    filtersForm.resetFields(); // Reset form fields
    localStorage.removeItem("source");
    setPage(1);
    getArticles(() => {
      setOpen(false); // Close the drawer after reset
    });
  };

  useEffect(() => {
    dispatch(getSourcesListFromNewsApiAction());
  }, []);

  useEffect(() => {
    if (source?.split(",")?.length > 0) {
      filtersForm.setFieldValue("source", source?.split(","));
    }
  }, [source]);

  // Fetch articles whenever the search string changes
  useEffect(() => {
    getArticles();
  }, [searchStr, page]);

  // Debounce search input to delay the API call while typing
  const handleSearch = debounce((value) => {
    setSearchStr(value);
    setPage(1);
  }, 1000);

  const skeletonArray = [0, 1, 2, 3, 4]; // Placeholder for loading skeletons

  return (
    <div>
      {/* Header card */}
      <TopCard
        heading="News Feed"
        handleSearch={handleSearch}
        onButtomClick={handleOpen}
        buttonText={"Customize"}
        totalRecords={totalRecords}
      />
      {/* Display loading skeletons, articles, or an empty state based on API results */}
      {isLoading ? (
        <div
          className={`h-[calc(100vh-190px)] sm:h-[calc(100vh-160px)] overflow-y-auto mt-3 pt-1 pb-2 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4`}
        >
          {skeletonArray.map((v) => (
            <NewsCardSkeleton key={v} />
          ))}
        </div>
      ) : entities?.length > 0 ? (
        <>
          <div
            className={`h-[calc(100vh-242px)] sm:h-[calc(100vh-205px)] overflow-y-auto mt-3 pt-1 pb-2 pr-1 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4`}
          >
            {entities?.map(
              (v) =>
                v?.url != "https://removed.com" && (
                  <NewsCard searchStr={searchStr} key={v.url} article={v} />
                )
            )}
          </div>
          <Pagination
            onClickPrev={() => setPage((prev) => prev - 1)}
            onClickNext={() => setPage((prev) => prev + 1)}
            prrevDisabled={page == 1}
            nextDisabled={entities?.length == totalRecords}
            loading={isLoading}
          />
        </>
      ) : (
        <div className="mt-20 flex justify-center">
          <Empty /> {/* Display empty state if no articles are found */}
        </div>
      )}

      {/* Customization drawer */}
      <CustomizationDrawer
        onClose={handleClose}
        onReset={onFiltersReset}
        onApply={() => {
          saveCustomization();
        }}
        open={open} // Control visibility of the drawer
        filtersForm={filtersForm} // Pass form instance to drawer
        loading={isLoading} // Pass loading state to drawer
        sources={sources}
      />
    </div>
  );
};
