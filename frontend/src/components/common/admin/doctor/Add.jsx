import { Formik } from "formik";
import React, { useEffect, useRef } from "react";
import { Button, Col, Form, Image, Modal, Row, Spinner } from "react-bootstrap";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  imageFile: yup.mixed().required("Gambar/foto wajib diisi"),
  namaDokter: yup
    .string()
    .matches(/^[^0-9]+$/, "Nama tidak boleh mengandung angka")
    .required("Nama wajib diisi"),
  sip: yup.string().required("SIP dokter wajib diisi"),
  spesialis: yup
    .string()
    .notOneOf(["Pilih Spesialis"], "Spesialis harus dipilih")
    .required("Spesialis wajib dipilih"),
});

const Add = ({ show, handleClose, handleAdd, isLoading }) => {
  const namaDokterRef = useRef(null);
  useEffect(() => {
    if (show && namaDokterRef.current) {
      namaDokterRef.current.focus();
    }
  }, [show]);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="border-0">
        <Modal.Title>Tambah Data Dokter</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          validationSchema={validationSchema}
          onSubmit={handleAdd}
          initialValues={{
            imageFile: null,
            namaDokter: "",
            sip: "",
            spesialis: "",
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
              {values.imageFile && (
                <div className="mb-3">
                  <Image
                    src={URL.createObjectURL(values.imageFile)}
                    thumbnail
                  />
                </div>
              )}
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>File</Form.Label>
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

              <Form.Group controlId="validationNama" className="mb-3">
                <Form.Label>Nama Dokter</Form.Label>
                <Form.Control
                  name="namaDokter"
                  type="text"
                  placeholder="Masukkan nama dokter"
                  value={values.namaDokter}
                  onChange={handleChange}
                  isValid={touched.namaDokter && !!errors.namaDokter}
                  isInvalid={touched.namaDokter && !!errors.namaDokter}
                  ref={namaDokterRef}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.namaDokter}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="validationIddokter" className="mb-3">
                <Form.Label>Sip</Form.Label>
                <Form.Control
                  name="sip"
                  type="text"
                  placeholder="Masukkan sip dokter"
                  value={values.sip}
                  onChange={handleChange}
                  isValid={touched.sip && !!errors.sip}
                  isInvalid={touched.sip && !!errors.sip}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.sip}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="validationSpesialis" className="mb-3">
                <Form.Label>Spesialis</Form.Label>
                <Form.Select
                  name="spesialis"
                  value={values.spesialis}
                  aria-label="Default select example"
                  onChange={handleChange}
                  isValid={touched.spesialis && !!errors.spesialis}
                  isInvalid={touched.spesialis && !!errors.spesialis}
                >
                  <option>Pilih Spesialis</option>
                  <option value="Jantung">Jantung</option>
                  <option value="Paru-Paru">Paru-Paru</option>
                  <option value="Syaraf">Syaraf</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.spesialis}
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
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      "Tambahkan"
                    )}
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

export default Add;
