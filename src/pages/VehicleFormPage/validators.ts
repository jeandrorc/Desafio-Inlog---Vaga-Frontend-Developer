import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = Yup.object().shape({
  identifier: Yup.string().required("Campo obrigatório"),
  image: Yup.string().url("URL inválida"),
  license_plate: Yup.string()
    .matches(
      /^[A-Z]{3}-?[0-9][A-Z0-9][0-9]{2}$/,
      "A placa deve seguir o formato AAA-9A99 ou AAA9A99."
    )
    .required("Campo obrigatório"),
  tracker_serial_number: Yup.string()
    .matches(
      /^[A-Z0-9]{1,11}$/,
      "Deve conter até 11 dígitos, letras ou números em maiúsculo."
    )
    .required("Campo obrigatório"),
  coordinates: Yup.object()
    .shape({
      lat: Yup.number()
        .min(-90, "Latitude inválida")
        .max(90, "Latitude inválida")
        .required("Latitude é obrigatória."),
      lng: Yup.number()
        .min(-180, "Longitude inválida")
        .max(180, "Longitude inválida")
        .required("Longitude é obrigatória."),
    })
    .required(),
});

export default yupResolver(schema);
