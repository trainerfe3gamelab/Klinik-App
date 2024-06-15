import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import CardDoctor from "../../cards/admin/CardDoctor";
import Add from "./Add";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import { api, postData } from "../../../../api/api";
import { handleSubmit } from "../../../../utils/handleFunction";
import { formDataDoctor } from "../../../../utils/body";
import useFetch from "../../../../hooks/useFetch";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Doctor = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const queryClient = useQueryClient();
  const { data, isSuccess } = useFetch("dokter-klinik", "doctorData");

  const handleAddClose = () => setShowAddModal(false);
  const handleAddShow = () => setShowAddModal(true);

  const onSubmit = async (values, actions) => {
    try {
      await
    handleSubmit(
      "post",
      "dokter-klinik/add",
      formDataDoctor(values),
      actions,
      handleAddClose,
      queryClient,
      "doctorData"
    );
    // Display toast notification upon successful addition
    toast.success("Berhasil menambahkan dokter!");
  } catch (error) {
    console.error("Error adding doctor:", error);
    // Handle error
  }
  };

  return (
    <Container fluid className="p-5 h-100 d-flex flex-column overflow-hidden">
      <ToastContainer />
      <Row className="align-items-center">
        <Col>
          <h2>Data Dokter</h2>
        </Col>
        <Col xs="auto">
          <Button
            variant="primary"
            onClick={handleAddShow}
            className="text-light fw-semibold"
          >
            Tambah
          </Button>
          <Add
            show={showAddModal}
            handleClose={handleAddClose}
            handleAdd={onSubmit}
          />
        </Col>
      </Row>
      <Row xs={1} className="gx-3 gy-4 overflow-y-scroll m-0">
        {data ? (
          data.map((item) => <CardDoctor key={item.dokter_id} data={item} />)
        ) : (
          <p>loading bolo</p>
        )}
      </Row>
    </Container>
  );
};

export default Doctor;
