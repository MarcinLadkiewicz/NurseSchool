import { darkTheme as colors } from "../theme/colors";

const getSeverityStyle = (severity) => {
  switch (severity) {
    case "alta":
      return { bg: colors.dangerBg, text: colors.danger, label: "ALTA" };
    case "media":
      return { bg: colors.warningBg, text: colors.warning, label: "MEDIA" };
    case "baja":
      return { bg: colors.successBg, text: colors.success, label: "BAJA" };
    default:
      return { bg: colors.dangerBg, text: colors.danger, label: "ALTA" };
  }
};

export default getSeverityStyle;
