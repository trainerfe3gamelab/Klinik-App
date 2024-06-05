import { Formik } from "formik";
import React, { useState } from "react";
import { Button, Col, Form, Image, Modal, Row } from "react-bootstrap";
import * as yup from "yup";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";

// const FILE_SIZE = 100 * 1024;
// const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

const editFacility = async (facilityId, updatedFacilityData) => {
  try {
    const formData = new FormData();
    formData.append("foto_fasilitas", updatedFacilityData.imageFile);
    formData.append("judul", updatedFacilityData.title);
    formData.append("deskripsi", updatedFacilityData.description);

    await axios.post(
      `http://localhost:3000/dashboard/fasilitas/edit/${facilityId}`,
      formData
    );
  } catch (error) {
    throw new Error("Failed to edit facility");
  }
};

const validationSchema = yup.object().shape({
  imageFile: yup.mixed(),
  // .test(
  //   "fileSize",
  //   "Ukuran file terlalu besar",
  //   (value) => value && value.size <= FILE_SIZE
  // )
  // .test(
  //   "fileFormat",
  //   "Format file tidak didukung",
  //   (value) => value && SUPPORTED_FORMATS.includes(value.type)
  // ),
  title: yup.string().required("judul wajib diisi"),
  description: yup.string().required("deskripsi wajib diisi"),
});

const Edit = ({ show, handleClose, data }) => {
  const { fasilitas_id, foto_fasilitas, judul, deskripsi } = data;
  const queryClient = useQueryClient();
  const handleSubmit = async (e) => {
    console.log(e);
    try {
      await editFacility(fasilitas_id, e);
      queryClient.invalidateQueries("fasilitasData");
      handleClose();
    } catch (error) {
      console.error("Failed to edit facility:", error);
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="border-0">
        <Modal.Title>Edit Fasilitas</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          initialValues={{
            imageFile: null,
            title: judul,
            description: deskripsi,
          }}
        >
          {({
            handleSubmit,
            values,
            touched,
            errors,
            handleChange,
            setFieldValue,
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              {values.imageFile ? (
                <div className="mb-3">
                  <Image
                    src={URL.createObjectURL(values.imageFile)}
                    thumbnail
                  />
                </div>
              ) : (
                <div className="mb-3">
                  <Image
                    src={`data:image/jpeg;base64, ${foto_fasilitas}`}
                    thumbnail
                  />
                </div>
              )}
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Upload Gambar</Form.Label>
                <Form.Control
                  type="file"
                  name="imageFile"
                  onChange={(e) =>
                    setFieldValue("imageFile", e.target.files[0])
                  }
                  isInvalid={!!errors.imageFile}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.imageFile}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="validationUsername" className="mb-3">
                <Form.Label>title</Form.Label>
                <Form.Control
                  name="title"
                  type="text"
                  placeholder="Masukkan judul fasilitas"
                  value={values.title}
                  onChange={handleChange}
                  isInvalid={touched.title && !!errors.title}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="validationPassword" className="mb-3">
                <Form.Label>description</Form.Label>
                <Form.Control
                  name="description"
                  type="text"
                  placeholder="Masukkan deskripsi fasilitas"
                  value={values.description}
                  onChange={handleChange}
                  isInvalid={touched.description && !!errors.description}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.description}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Row}>
                <Col>
                  <Button
                    variant="secondary"
                    type="button"
                    className="w-100 bg-transparent border-0"
                    onClick={handleClose}
                  >
                    Batal
                  </Button>
                </Col>
                <Col>
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 text-light"
                  >
                    Simpan
                  </Button>
                </Col>
              </Form.Group>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default Edit;
