import React from "react";
import { Button, DatePicker, Drawer, Form, Select } from "antd";
import { useWindowDimensions } from "../../helpers";
const { RangePicker } = DatePicker;
export const FilterDrawer = ({
  open,
  onClose,
  filtersForm,
  onApply,
  onReset,
  loading,
  sections,
}) => {
  const dimensions = useWindowDimensions();
  return (
    <Drawer title="Apply Filters" onClose={onClose} open={open}>
      <Form
        form={filtersForm}
        layout="vertical"
        autoComplete={false}
        onFinish={onApply}
      >
        <div
          style={{ height: dimensions.height - 150 }}
          className="overflow-y-auto"
        >
          <Form.Item label="Date Range" name="dateRange">
            <RangePicker className="w-full" disabled={loading} />
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Select
              showSearch
              placeholder="Select categories"
              optionFilterProp="label"
              options={sections}
              disabled={loading}
              allowClear
            />
          </Form.Item>
        </div>
        <div className="border-t flex justify-end pt-2">
          <Button
            className="bg-white text-black"
            variant="solid"
            onClick={onReset}
            loading={loading}
          >
            Reset
          </Button>
          <Button
            className="bg-black text-white ml-2"
            variant="solid"
            onClick={onApply}
            loading={loading}
          >
            Apply
          </Button>
        </div>
      </Form>
    </Drawer>
  );
};
