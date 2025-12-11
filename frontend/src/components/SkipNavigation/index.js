import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  skipLink: {
    position: "absolute",
    left: "-9999px",
    zIndex: 9999,
    padding: "16px 24px",
    backgroundColor: theme.palette.primary.main,
    color: "#FFFFFF",
    textDecoration: "none",
    borderRadius: "0 0 8px 0",
    fontWeight: 600,
    fontSize: "16px",
    boxShadow: theme.shadows[4],
    transition: "all 0.2s ease",
    "&:focus": {
      left: 0,
      top: 0,
      outline: `3px solid ${theme.palette.primary.light}`,
      outlineOffset: "2px",
    },
  },
}));

/**
 * ♿ ACESSIBILIDADE: Componente Skip Navigation
 * Permite que usuários de teclado/screen reader pulem diretamente para o conteúdo principal
 *
 * Uso:
 * <SkipNavigation mainId="main-content" />
 *
 * O elemento de destino deve ter o ID correspondente:
 * <main id="main-content">...</main>
 */
const SkipNavigation = ({ mainId = "main-content" }) => {
  const classes = useStyles();

  return (
    <a
      href={`#${mainId}`}
      className={classes.skipLink}
      aria-label="Pular para o conteúdo principal"
    >
      Pular para o conteúdo principal
    </a>
  );
};

export default SkipNavigation;
