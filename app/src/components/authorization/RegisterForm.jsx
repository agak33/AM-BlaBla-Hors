import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Form from 'react-bootstrap/Form';

export function RegisterForm({
  fields,
  errors,
  firstNameLabel,
  lastNameLabel,
  emailLabel,
  passwordLabel,
}) {
  return (
    <>
      <FloatingLabel label={firstNameLabel}>
        <Form.Control
          type="text"
          id={`${fields.firstName}`}
          isInvalid={errors.firstName}
        />
        <Form.Control.Feedback type="invalid">
          {errors.firstName}
        </Form.Control.Feedback>
      </FloatingLabel>

      <FloatingLabel label={lastNameLabel}>
        <Form.Control
          type="text"
          id={`${fields.lastName}`}
          isInvalid={errors.lastName}
        />
        <Form.Control.Feedback type="invalid">
          {errors.lastName}
        </Form.Control.Feedback>
      </FloatingLabel>

      <FloatingLabel label={emailLabel}>
        <Form.Control
          type="email"
          id={`${fields.email}`}
          isInvalid={errors.email}
        />
        <Form.Control.Feedback type="invalid">
          {errors.email}
        </Form.Control.Feedback>
      </FloatingLabel>

      <FloatingLabel label={passwordLabel}>
        <Form.Control
          type="password"
          id={`${fields.password}`}
          isInvalid={errors.password}
        />
        <Form.Control.Feedback type="invalid">
          {errors.password}
        </Form.Control.Feedback>
      </FloatingLabel>
    </>
  );
}

RegisterForm.propTypes = {
  fields: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  firstNameLabel: PropTypes.string.isRequired,
  lastNameLabel: PropTypes.string.isRequired,
  emailLabel: PropTypes.string.isRequired,
  passwordLabel: PropTypes.string.isRequired,
};
