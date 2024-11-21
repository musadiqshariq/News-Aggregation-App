import React, { useEffect, useState } from "react";
import {
  FilterDrawer,
  NewsCard,
  NewsCardSkeleton,
  TopCard,
} from "../../generalComponents";
import { useDispatch, useSelector } from "react-redux";
import {
  getSectionListFromNewYorkTimesAction,
  searchArcticlesFromNewYorkTimesAction,
} from "./redux/actions";
import { Empty, Form } from "antd";
import { debounce } from "lodash";

// Component to display and filter articles from The New York Times
export const NewYorkTimes = () => {
  const dispatch = useDispatch(); // Dispatch for Redux actions
  const [filtersForm] = Form.useForm(); // AntD form instance for filters
  const [isLoading, setIsLoading] = useState(true); // Loading state for API calls
  const [searchStr, setSearchStr] = useState(""); // Search input state
  const { entities, sections } = useSelector((state) => state.newYorkTimes); // Articles fetched from Redux state
  const [open, setOpen] = useState(false); // State to control the visibility of the filter drawer

  // Function to fetch articles with filters applied
  const getArticles = (onSuccess) => {
    setIsLoading(true); // Set loading state to true while fetching
    const filters = []; // Array to hold filter conditions
    const dateRange = filtersForm.getFieldValue("dateRange"); // Get date range from filter form
    let startDate;
    let endDate;

    if (dateRange) {
      // Format start and end dates
      startDate = dateRange[0].format("YYYYMMDD");
      endDate = dateRange[1].format("YYYYMMDD");
    }
    const category = filtersForm.getFieldValue("category"); // Get selected category

    // Add category filter to the filters array
    if (category) {
      filters.push(`section_name:("${category}")`);
    }

    // Create filter query strings
    const sectionQuery = filters.length ? `&fq=${filters.join("&fq=")}` : "";
    const dataFilter =
      startDate && endDate
        ? `&begin_date=${startDate}&end_date=${endDate}`
        : "";
    const filterQuery = `${sectionQuery}${dataFilter}`;

    // Dispatch the action to fetch articles
    dispatch(
      searchArcticlesFromNewYorkTimesAction(
        searchStr,
        filterQuery,
        setIsLoading,
        onSuccess
      )
    );
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
    getArticles(() => {
      setOpen(false); // Close the drawer after reset
    });
  };

  useEffect(() => {
    dispatch(getSectionListFromNewYorkTimesAction());
  }, []);

  // Fetch articles whenever the search string changes
  useEffect(() => {
    getArticles();
  }, [searchStr]);

  // Debounce search input to delay the API call while typing
  const handleSearch = debounce((value) => {
    setSearchStr(value);
  }, 1000);

  const skeletonArray = [0, 1, 2, 3, 4]; // Placeholder for loading skeletons

  return (
    <div>
      {/* Header card with search and filter button */}
      <TopCard
        heading="The New York Times"
        handleSearch={handleSearch}
        onButtomClick={handleOpen}
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
        <div
          className={`h-[calc(100vh-190px)] sm:h-[calc(100vh-160px)] overflow-y-auto mt-3 pt-1 pb-2 pr-1 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4`}
        >
          {entities?.map((v) => (
            <NewsCard searchStr={searchStr} key={v.url} article={v} />
          ))}
        </div>
      ) : (
        <div className="mt-20 flex justify-center">
          <Empty /> {/* Display empty state if no articles are found */}
        </div>
      )}

      {/* Filter drawer for applying filters */}
      <FilterDrawer
        onClose={handleClose}
        onReset={onFiltersReset}
        onApply={() => {
          getArticles(() => {
            setOpen(false); // Close drawer after applying filters
          });
        }}
        open={open} // Control visibility of the drawer
        filtersForm={filtersForm} // Pass form instance to drawer
        loading={isLoading} // Pass loading state to drawer
        sections={sections}
      />
    </div>
  );
};
