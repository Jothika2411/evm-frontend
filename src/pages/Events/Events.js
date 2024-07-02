import { Button, Modal, message, TimePicker } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import SubmitButton from "../../components/antd/SubmitButton";
import ATable from "../../components/antd/Table/Table";
import FormItem from "../../components/antd/FormItem";
import Datepicker from "../../components/antd/Datepicker";
import moment from "moment";
import TimeRangePickerComponent from "../../components/antd/TimePIcker";

const Events = () => {
  const [data, setData] = useState([]);
  const [venues, setVenues] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState(["", ""]);
  const [initialValues, setInitialValues] = useState({
    event: "",
    venue: "",
    date: "",
    time: ["", ""],
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
      dataIndex: ["venue", "name"],
      key: "venue",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => moment(text).format("DD-MM-YYYY"),
    },
    {
      title: "Start Time",
      dataIndex: ["time", "from"],
      key: "startTime",
      render: (text) => (text ? moment(text).format("HH:mm") : ""),
    },
    {
      title: "End Time",
      dataIndex: ["time", "to"],
      key: "endTime",
      render: (text) => (text ? moment(text).format("HH:mm") : ""),
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
        time: [record.time.from, record.time.to],
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
      time: ["", ""],
    });
    setIsEditing(false);
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleTimeRangeChange = (timeStrings) => {
    setSelectedTimeRange({
      from: timeStrings[0],
      to: timeStrings[1],
    });
  };

  const handleFormSubmit = async (values, { resetForm }) => {
    console.log("Form Values:", values);
    const updatedValues = {
      ...values,
      time: {
        from: selectedTimeRange.from,
        to: selectedTimeRange.to,
      },
    };
    console.log("updated Form Values:", updatedValues);

    if (isEditing) {
      try {
        await axios.patch(
          `http://localhost:8080/api/register/event/${currentEventId}`,
          updatedValues
        );
        setData(
          data.map((item) =>
            item._id === currentEventId ? { ...item, ...updatedValues } : item
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
          updatedValues
        );
        const newEvent = res.data;
        setData([...data, newEvent]);
        message.success("Event added successfully");
      } catch (error) {
        console.error("Error adding event", error);
        message.error("Error adding event");
      }
    }
    resetForm();
    setIsModalVisible(false);
    fetchEvent();
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

              <Field as="select" name="venue" onChange={handleChange}>
                <option value="">Select Venue</option>
                {venues.map((venue) => (
                  <option key={venue._id} value={venue._id}>
                    {venue.name}
                  </option>
                ))}
              </Field>

              <Datepicker
                name="date"
                value={values.date}
                onChange={(date) =>
                  handleChange({ target: { name: "date", value: date } })
                }
              />

              <TimeRangePickerComponent
                onTimeRangeChange={handleTimeRangeChange}
                name="time"
                value={[selectedTimeRange.from, selectedTimeRange.to]}
              />
              <SubmitButton text="Submit" />
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default Events;
