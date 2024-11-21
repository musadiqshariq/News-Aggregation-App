import React from "react";
import { Button, Drawer, Form, Select } from "antd";
import { useWindowDimensions } from "../../helpers";
export const CustomizationDrawer = ({
  open,
  onClose,
  filtersForm,
  onApply,
  onReset,
  loading,
  sources,
}) => {
  const dimensions = useWindowDimensions();
  return (
    <Drawer title="Customize" onClose={onClose} open={open}>
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
          <Form.Item label="Source" name="source">
            <Select
              mode="multiple"
              showSearch
              placeholder="Select sources"
              optionFilterProp="label"
              options={sources}
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
