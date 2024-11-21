import { Button } from "antd";
import React from "react";

export const Pagination = ({
  loading,
  onClickPrev,
  onClickNext,
  prrevDisabled,
  nextDisabled,
}) => {
  return (
    <div className="pt-4 border-t flex justify-end gap-3">
      <Button
        className="bg-black text-white"
        variant="solid"
        onClick={onClickPrev}
        loading={loading}
        disabled={prrevDisabled}
      >
        Prev
      </Button>{" "}
      <Button
        className="bg-black text-white"
        variant="solid"
        loading={loading}
        onClick={onClickNext}
        disabled={nextDisabled}
      >
        Next
      </Button>
    </div>
  );
};
