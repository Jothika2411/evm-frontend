import { Table, Button, Modal, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import SubmitButton from "../../components/antd/SubmitButton";
import ATable from "../../components/antd/Table/Table";
import FormItem from "../../components/antd/FormItem";
import { DatePicker, TimePicker } from "antd";

const Events = () => {
  const [data, setData] = useState([]);
  const [venues, setVenues] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [initialValues, setInitialValues] = useState({
    event: "",
    venue: "",
    date: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentEventId, setCurrentEventId] = useState(null);

  const fetchEvent = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/register/event");
      const eventData = res.data;
      if (eventData && Array.isArray(eventData.events)) {
        setData(eventData.events);
      } else {
        console.error("Fetched data does not contain an array", eventData);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const fetchVenues = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/register/venue");
      const venueData = res.data;
      if (venueData && Array.isArray(venueData.events)) {
        setVenues(venueData.events);
      } else {
        console.error("Fetched data does not contain an array", venueData);
      }
    } catch (error) {
      console.error("Error ", error);
    }
  };
  useEffect(() => {
    fetchEvent();
    fetchVenues();
  }, []);

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
      title: "Time",
      dataIndex: "time",
      key: "time",
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
            onClick={() => handleDelete(record._id)}
          />
        </span>
      ),
    },
  ];

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/register/event/${id}`);
      setData(data.filter((item) => item._id !== id));
      message.success("Event deleted successfully");
    } catch (error) {
      console.error("Error deleting event", error);
      message.error("Error deleting event");
    }
  };

  const handleEdit = (record) => {
    if (record._id) {
      setInitialValues({
        event: record.event,
        venue: record.venue,
        date: record.date,
      });
      setCurrentEventId(record._id);
      setIsEditing(true);
      setIsModalVisible(true);
    } else {
      console.error("Record does not have an ID:", record);
      message.error("Record does not have an ID");
    }
  };

  const handleAddEvent = () => {
    setInitialValues({
      event: "",
      venue: "",
      date: "",
    });
    setIsEditing(false);
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const handleFormSubmit = async (values, { resetForm }) => {
    console.log("Form Values:", values);
    console.log("Form Venue:", venues);

    if (isEditing) {
      try {
        await axios.patch(
          `http://localhost:8080/api/register/event/${currentEventId}`,
          values
        );
        setData(
          data.map((item) =>
            item._id === currentEventId ? { ...item, ...values } : item
          )
        );
        message.success("Event updated successfully");
      } catch (error) {
        console.error("Error updating event", error);
        message.error("Error updating event");
      }
    } else {
      try {
        const res = await axios.post(
          "http://localhost:8080/api/register/event",
          values
        );
        const newEvent = res.data;
        console.log(newEvent)
        setData([...data, newEvent]);
        message.success("Event added successfully");
      } catch (error) {
        console.error("Error adding event", error);
        message.error("Error adding event");
      }
    }
    resetForm();
    setIsModalVisible(false);
  };

  return (
    <div>
      <Button type="primary" onClick={handleAddEvent}>
        Add Event
      </Button>
      <ATable columns={columns} dataSource={data} rowKey="_id" />
      <Modal open={isModalVisible} onCancel={handleModalCancel} footer={null}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleFormSubmit}
          enableReinitialize
        >
          {({ values, handleChange }) => (
            <Form>
              <FormItem
                name="event"
                placeholder="Event"
                value={values.event}
                onChange={handleChange}
              />

              <Field
                as="select"
                name="venue"
                onChange={handleChange}
                value={values.venue}
                style={{ width: "100%", marginBottom: 16 }}
              >
                <option value="">Select Venue</option>
                {venues.map((venue) => (
                  <option key={venue._id} value={values.venue}>
                    {venue.name}
                  </option>
                ))}
              </Field>

              {/* <DatePicker
                name="date"
                value={values.date}
                onChange={(date) => handleChange("date", date)}
                format="YYYY-MM-DD"
                style={{ width: "100%", marginBottom: 16 }}
              />

              <TimePicker.RangePicker
                name="timeRange"
                value={values.timeRange}
                onChange={(times) => handleChange("timeRange", times)}
                format="HH:mm"
                style={{ width: "100%", marginBottom: 16 }}
              /> */}

              <SubmitButton text="Submit" />
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default Events;
