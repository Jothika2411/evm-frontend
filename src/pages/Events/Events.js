import React, { useState } from "react";
import ATable from "../../components/antd/Table/Table";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { Formik, Form } from "formik";
import FormItem from "../../components/antd/FormItem";
import SubmitButton from "../../components/antd/SubmitButton";

const Events = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const columns = [
    {
      title: "Event",
      dataIndex: "event",
      key: "event",
    },
    {
      title: "Venue",
      dataIndex: "venue",
      key: "venue",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <span>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Button
            type="link"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          />
        </span>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      event: "John Brown",
      venue: 32,
      date: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      event: "Jim Green",
      venue: 42,
      date: "London No. 1 Lake Park",
    },
    {
      key: "3",
      event: "Joe Black",
      venue: 32,
      date: "Sidney No. 1 Lake Park",
    },
  ];

  const handleEdit = (record) => {
    console.log("Edit record", record);
  };

  const handleDelete = (record) => {
    console.log("Delete record", record);
  };

  const handleAddEvent = () => {
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleFormSubmit = (values) => {
    console.log("Event Form Value", values);
    setIsModalVisible(false);
  };

  return (
    <div>
      <Button type="primary" onClick={handleAddEvent}>
        Add Events
      </Button>
      <ATable columns={columns} dataSource={data} />
      <Modal
        title="Add Event"
        visible={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Formik
          initialValues={{ event: "", venue: "", date: "" }}
          onSubmit={handleFormSubmit}
        >
          {() => (
            <Form>
              <FormItem name="event" placeholder="Event" />
              <FormItem name="venue" label="Venue" />
              <FormItem name="date" label="Date" />
              <SubmitButton text="Submit" />
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default Events;
