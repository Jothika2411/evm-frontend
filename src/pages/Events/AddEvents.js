import React, { useEffect, useState } from "react";
import { Table, Button, Modal, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import SubmitButton from "../../components/antd/SubmitButton";

const Events = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);

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

  const handleEdit = (record) => {
    setEditingEvent(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (record) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/register/event/${record.id}`
      );
      message.success("Event deleted successfully");
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
      message.error("Error deleting event");
    }
  };

  const handleAddEvent = () => {
    setEditingEvent(null);
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/register/event"
      );
      const fetchedEvents = response.data.map((event) => ({
        ...event,
        key: event.id, 
      }));
      setEvents(fetchedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleFormSubmit = async (values, { resetForm }) => {
    console.log("Submitting form with values:", values);
    try {
      let response;
      if (editingEvent) {
        response = await axios.put(
          `http://localhost:8080/api/register/event/${editingEvent.id}`,
          values
        );
        message.success("Event updated successfully");
      } else {
        response = await axios.post(
          "http://localhost:8080/api/register/event",
          values
        );
        message.success("Event added successfully");
        setEvents((prevEvents) => [
          ...prevEvents,
          { ...response.data, key: response.data.id },
        ]);
      }
      setIsModalVisible(false);
      fetchEvents();
      resetForm();
      setEditingEvent(null);
      console.log("Response from API:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <Button type="primary" onClick={handleAddEvent}>
        Add Event
      </Button>
      <Table columns={columns} dataSource={events} />
      <Modal
        title={editingEvent ? "Edit Event" : "Add Event"}
        open={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Formik
          initialValues={editingEvent || { event: "", venue: "", date: "" }}
          onSubmit={handleFormSubmit}
        >
          {({ values, handleChange }) => (
            <Form>
              <div>
                <label>Event</label>
                <Field
                  name="event"
                  placeholder="Event"
                  value={values.event}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Venue</label>
                <Field
                  name="venue"
                  placeholder="Venue"
                  value={values.venue}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Date</label>
                <Field
                  name="date"
                  placeholder="Date"
                  value={values.date}
                  onChange={handleChange}
                />
              </div>
              <SubmitButton text={editingEvent ? "Update" : "Submit"} />
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default Events;
