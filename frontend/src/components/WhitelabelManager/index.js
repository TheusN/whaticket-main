import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Grid,
  TextField,
  Typography,
  Button,
  Box,
  Divider,
  IconButton,
  Card,
  CardMedia
} from "@material-ui/core";
import {
  PhotoCamera,
  Delete as DeleteIcon,
  Palette as PaletteIcon,
  Image as ImageIcon,
  Save as SaveIcon,
  Refresh as RefreshIcon
} from "@material-ui/icons";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import ButtonWithSpinner from "../ButtonWithSpinner";
import useWhitelabel from "../../hooks/useWhitelabel";
import { useWhitelabelContext } from "../../context/Whitelabel/WhitelabelContext";

const useStyles = makeStyles((theme) => ({
  section: {
    marginBottom: theme.spacing(4),
  },
  sectionTitle: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(2),
    color: theme.palette.primary.main,
    fontWeight: 600,
    "& svg": {
      marginRight: theme.spacing(1),
    },
  },
  imageCard: {
    border: `2px dashed ${theme.palette.divider}`,
    borderRadius: theme.spacing(2),
    padding: theme.spacing(2),
    textAlign: "center",
    position: "relative",
    minHeight: 200,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: theme.palette.background.default,
    transition: "all 0.3s ease",
    "&:hover": {
      borderColor: theme.palette.primary.main,
      backgroundColor: theme.palette.action.hover,
    },
  },
  imagePreview: {
    maxWidth: "100%",
    maxHeight: 180,
    objectFit: "contain",
    borderRadius: theme.spacing(1),
  },
  uploadButton: {
    marginTop: theme.spacing(2),
  },
  deleteButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: theme.palette.error.main,
    color: "#FFF",
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
  },
  previewBox: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(3),
    border: `2px solid ${theme.palette.divider}`,
    borderRadius: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
  },
  previewTitle: {
    fontWeight: 600,
    marginBottom: theme.spacing(2),
    color: theme.palette.text.primary,
  },
  previewDemo: {
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
  emptyState: {
    textAlign: "center",
    color: theme.palette.text.secondary,
    "& svg": {
      fontSize: 48,
      marginBottom: theme.spacing(1),
      opacity: 0.5,
    },
  },
}));

const WhitelabelSchema = Yup.object().shape({
  companyName: Yup.string()
    .min(2, "Nome muito curto")
    .max(100, "Nome muito longo"),
  primaryColorLight: Yup.string().matches(
    /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
    "Cor inválida (use formato #HEX)"
  ),
  primaryColorDark: Yup.string().matches(
    /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
    "Cor inválida (use formato #HEX)"
  ),
});

const WhitelabelManager = () => {
  const classes = useStyles();
  const { whitelabel, loading, fetchWhitelabel, createWhitelabel, updateWhitelabel, uploadImage, deleteImage } = useWhitelabel();
  const { fetchWhitelabel: refreshGlobalWhitelabel, getImageUrl } = useWhitelabelContext();

  const [initialValues, setInitialValues] = useState({
    companyName: "",
    primaryColorLight: "#8B5CF6",
    secondaryColorLight: "#F3F4F6",
    backgroundColorLight: "#FFFFFF",
    textColorLight: "#1F2937",
    primaryColorDark: "#8B5CF6",
    secondaryColorDark: "#1F2937",
    backgroundColorDark: "#111827",
    textColorDark: "#F9FAFB",
  });

  useEffect(() => {
    if (whitelabel) {
      setInitialValues({
        companyName: whitelabel.companyName || "",
        primaryColorLight: whitelabel.primaryColorLight || "#8B5CF6",
        secondaryColorLight: whitelabel.secondaryColorLight || "#F3F4F6",
        backgroundColorLight: whitelabel.backgroundColorLight || "#FFFFFF",
        textColorLight: whitelabel.textColorLight || "#1F2937",
        primaryColorDark: whitelabel.primaryColorDark || "#8B5CF6",
        secondaryColorDark: whitelabel.secondaryColorDark || "#1F2937",
        backgroundColorDark: whitelabel.backgroundColorDark || "#111827",
        textColorDark: whitelabel.textColorDark || "#F9FAFB",
      });
    }
  }, [whitelabel]);

  const handleImageUpload = async (field, event) => {
    const file = event.target.files[0];
    if (!file) return;

    const validTypes = ["image/png", "image/jpg", "image/jpeg", "image/svg+xml", "image/x-icon"];
    if (!validTypes.includes(file.type)) {
      toast.error("Formato inválido. Use PNG, JPG, SVG ou ICO");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Arquivo muito grande. Máximo 5MB");
      return;
    }

    await uploadImage(field, file);
    await refreshGlobalWhitelabel();
  };

  const handleDeleteImage = async (field) => {
    if (window.confirm(`Deseja realmente remover esta imagem?`)) {
      await deleteImage(field);
      await refreshGlobalWhitelabel();
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (whitelabel) {
        await updateWhitelabel(values);
      } else {
        await createWhitelabel(values);
      }
      await refreshGlobalWhitelabel();
    } catch (error) {
      console.error("Error saving whitelabel:", error);
    }
  };

  const ImageUploadCard = ({ field, label, currentImage }) => (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.imageCard}>
        {currentImage ? (
          <>
            <CardMedia
              component="img"
              image={getImageUrl(currentImage)}
              alt={label}
              className={classes.imagePreview}
            />
            <IconButton
              className={classes.deleteButton}
              size="small"
              onClick={() => handleDeleteImage(field)}
            >
              <DeleteIcon />
            </IconButton>
          </>
        ) : (
          <Box className={classes.emptyState}>
            <ImageIcon />
            <Typography variant="body2">{label}</Typography>
          </Box>
        )}
        <input
          accept="image/png,image/jpg,image/jpeg,image/svg+xml,image/x-icon"
          style={{ display: "none" }}
          id={`upload-${field}`}
          type="file"
          onChange={(e) => handleImageUpload(field, e)}
        />
        <label htmlFor={`upload-${field}`}>
          <Button
            variant="contained"
            color="primary"
            component="span"
            startIcon={<PhotoCamera />}
            className={classes.uploadButton}
            size="small"
          >
            {currentImage ? "Trocar" : "Enviar"}
          </Button>
        </label>
      </Card>
    </Grid>
  );

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validationSchema={WhitelabelSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
        <Form>
          {/* SEÇÃO: INFORMAÇÕES BÁSICAS */}
          <Box className={classes.section}>
            <Typography variant="h6" className={classes.sectionTitle}>
              <ImageIcon /> Informações Básicas
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nome da Empresa"
                  name="companyName"
                  value={values.companyName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.companyName && Boolean(errors.companyName)}
                  helperText={touched.companyName && errors.companyName}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Box>

          <Divider />

          {/* SEÇÃO: IMAGENS */}
          <Box className={classes.section}>
            <Typography variant="h6" className={classes.sectionTitle}>
              <ImageIcon /> Imagens e Logos
            </Typography>
            <Grid container spacing={3}>
              <ImageUploadCard
                field="logoLight"
                label="Logo Modo Claro"
                currentImage={whitelabel?.logoLight}
              />
              <ImageUploadCard
                field="logoDark"
                label="Logo Modo Escuro"
                currentImage={whitelabel?.logoDark}
              />
              <ImageUploadCard
                field="favicon"
                label="Favicon"
                currentImage={whitelabel?.favicon}
              />
              <ImageUploadCard
                field="loginBanner"
                label="Banner de Login"
                currentImage={whitelabel?.loginBanner}
              />
              <ImageUploadCard
                field="loginLogo"
                label="Logo de Login"
                currentImage={whitelabel?.loginLogo}
              />
            </Grid>
          </Box>

          <Divider />

          {/* SEÇÃO: CORES MODO CLARO */}
          <Box className={classes.section}>
            <Typography variant="h6" className={classes.sectionTitle}>
              <PaletteIcon /> Cores - Modo Claro
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label="Cor Primária"
                  name="primaryColorLight"
                  type="color"
                  value={values.primaryColorLight}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.primaryColorLight && Boolean(errors.primaryColorLight)}
                  helperText={touched.primaryColorLight && errors.primaryColorLight}
                  variant="outlined"
                  InputProps={{
                    startAdornment: <Box component="span" mr={1}>{values.primaryColorLight}</Box>,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label="Cor Secundária"
                  name="secondaryColorLight"
                  type="color"
                  value={values.secondaryColorLight}
                  onChange={handleChange}
                  variant="outlined"
                  InputProps={{
                    startAdornment: <Box component="span" mr={1}>{values.secondaryColorLight}</Box>,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label="Cor de Fundo"
                  name="backgroundColorLight"
                  type="color"
                  value={values.backgroundColorLight}
                  onChange={handleChange}
                  variant="outlined"
                  InputProps={{
                    startAdornment: <Box component="span" mr={1}>{values.backgroundColorLight}</Box>,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label="Cor do Texto"
                  name="textColorLight"
                  type="color"
                  value={values.textColorLight}
                  onChange={handleChange}
                  variant="outlined"
                  InputProps={{
                    startAdornment: <Box component="span" mr={1}>{values.textColorLight}</Box>,
                  }}
                />
              </Grid>
            </Grid>
          </Box>

          <Divider />

          {/* SEÇÃO: CORES MODO ESCURO */}
          <Box className={classes.section}>
            <Typography variant="h6" className={classes.sectionTitle}>
              <PaletteIcon /> Cores - Modo Escuro
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label="Cor Primária"
                  name="primaryColorDark"
                  type="color"
                  value={values.primaryColorDark}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.primaryColorDark && Boolean(errors.primaryColorDark)}
                  helperText={touched.primaryColorDark && errors.primaryColorDark}
                  variant="outlined"
                  InputProps={{
                    startAdornment: <Box component="span" mr={1}>{values.primaryColorDark}</Box>,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label="Cor Secundária"
                  name="secondaryColorDark"
                  type="color"
                  value={values.secondaryColorDark}
                  onChange={handleChange}
                  variant="outlined"
                  InputProps={{
                    startAdornment: <Box component="span" mr={1}>{values.secondaryColorDark}</Box>,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label="Cor de Fundo"
                  name="backgroundColorDark"
                  type="color"
                  value={values.backgroundColorDark}
                  onChange={handleChange}
                  variant="outlined"
                  InputProps={{
                    startAdornment: <Box component="span" mr={1}>{values.backgroundColorDark}</Box>,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label="Cor do Texto"
                  name="textColorDark"
                  type="color"
                  value={values.textColorDark}
                  onChange={handleChange}
                  variant="outlined"
                  InputProps={{
                    startAdornment: <Box component="span" mr={1}>{values.textColorDark}</Box>,
                  }}
                />
              </Grid>
            </Grid>
          </Box>

          <Divider />

          {/* PREVIEW */}
          <Box className={classes.previewBox}>
            <Typography variant="h6" className={classes.previewTitle}>
              👁️ Preview - Modo Claro
            </Typography>
            <Box
              className={classes.previewDemo}
              style={{
                backgroundColor: values.backgroundColorLight,
                border: `2px solid ${values.secondaryColorLight}`,
              }}
            >
              <Typography
                variant="h5"
                style={{ color: values.textColorLight, marginBottom: 16 }}
              >
                {values.companyName || "Nome da Empresa"}
              </Typography>
              <Button
                variant="contained"
                style={{
                  backgroundColor: values.primaryColorLight,
                  color: "#FFF",
                }}
              >
                Botão Primário
              </Button>
            </Box>

            <Typography variant="h6" className={classes.previewTitle} style={{ marginTop: 24 }}>
              👁️ Preview - Modo Escuro
            </Typography>
            <Box
              className={classes.previewDemo}
              style={{
                backgroundColor: values.backgroundColorDark,
                border: `2px solid ${values.secondaryColorDark}`,
              }}
            >
              <Typography
                variant="h5"
                style={{ color: values.textColorDark, marginBottom: 16 }}
              >
                {values.companyName || "Nome da Empresa"}
              </Typography>
              <Button
                variant="contained"
                style={{
                  backgroundColor: values.primaryColorDark,
                  color: "#FFF",
                }}
              >
                Botão Primário
              </Button>
            </Box>
          </Box>

          {/* BOTÃO SALVAR */}
          <Box mt={3} display="flex" justifyContent="flex-end">
            <ButtonWithSpinner
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              loading={isSubmitting || loading}
              startIcon={<SaveIcon />}
            >
              Salvar Configurações
            </ButtonWithSpinner>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default WhitelabelManager;
