import React, { useState, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import packageJson from "../../../package.json";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import InputAdornment from "@material-ui/core/InputAdornment";
import { i18n } from "../../translate/i18n";
import { AuthContext } from "../../context/Auth/AuthContext";
import logoDefault from "../../assets/logo.png";
import { LanguageOutlined, Visibility, VisibilityOff } from "@material-ui/icons";
import { useWhitelabelContext } from "../../context/Whitelabel/WhitelabelContext";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import LanguageControl from "../../components/LanguageControl";

const { versionSystem, nomeEmpresa } = packageJson;


const Copyright = () => {
	return (
		<Typography variant="body2" color="primary" align="center">
			{"Copyright "}
 			<Link color="primary" href="#">
 				{ nomeEmpresa } - v { versionSystem }
 			</Link>{" "}
 			{new Date().getFullYear()}
 			{"."}
 		</Typography>
 	);
 };

const useStyles = makeStyles(theme => ({
	root: {
		width: "100vw",
		height: "100vh",
		//background: "linear-gradient(to right, #682EE3 , #682EE3 , #682EE3)",
		//backgroundImage: "url(https://i.imgur.com/CGby9tN.png)",
		backgroundColor: theme.palette.primary.main,
		backgroundRepeat: "no-repeat",
		backgroundSize: "100% 100%",
		backgroundPosition: "center",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		textAlign: "center",
		position: "relative"
	},
	paper: {
		backgroundColor: theme.palette.login,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		padding: "55px 30px",
		borderRadius: "12.5px",
	},
	avatar: {
		margin: theme.spacing(1),  
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	powered: {
		color: "white"
	},
	languageControl: {
		position: "absolute",
		top: 0,
		left: 0,
		paddingLeft: 15
	}
}));

const Login = () => {
	const classes = useStyles();

	const [user, setUser] = useState({ email: "", password: "" });
	const [showPassword, setShowPassword] = useState(false);

	// Languages
	const [anchorElLanguage, setAnchorElLanguage] = useState(null);
	const [menuLanguageOpen, setMenuLanguageOpen] = useState(false);

	const { handleLogin } = useContext(AuthContext);
	const { whitelabel } = useWhitelabelContext();

	// Usar logo do whitelabel (loginLogo ou logoLight) ou padrão
	const loginLogo = React.useMemo(() => {
		if (whitelabel?.loginLogo) {
			return `${process.env.REACT_APP_BACKEND_URL}${whitelabel.loginLogo}`;
		}
		if (whitelabel?.logoLight) {
			return `${process.env.REACT_APP_BACKEND_URL}${whitelabel.logoLight}`;
		}
		return logoDefault;
	}, [whitelabel]);

	const handleChangeInput = e => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const handlSubmit = e => {
		e.preventDefault();
		handleLogin(user);
	};

	const handlemenuLanguage = ( event ) => {
		setAnchorElLanguage(event.currentTarget);
		setMenuLanguageOpen( true );
	}

	const handleCloseMenuLanguage = (  ) => {
		setAnchorElLanguage(null);
		setMenuLanguageOpen(false);
	}

	const handleTogglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};
	
	return (
		<div className={classes.root}>
		<div className={classes.languageControl}>
			<IconButton
				edge="start"
				aria-label="selecionar idioma"
				aria-controls="menu-appbar"
				aria-haspopup="true"
				onClick={handlemenuLanguage}
			>
				<LanguageOutlined
					style={{ color: "white" }}
				/>
			</IconButton>
			<Menu
				id="menu-appbar-language"
				anchorEl={anchorElLanguage}
				getContentAnchorEl={null}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "right",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				open={menuLanguageOpen}
				onClose={handleCloseMenuLanguage}
			>
				<MenuItem>
					<LanguageControl />
				</MenuItem>
			</Menu>
		</div>
		<Container component="main" maxWidth="xs">
			<CssBaseline/>
			<div className={classes.paper}>
				<div>
					<img style={{ margin: "0 auto", width: "70%" }} src={loginLogo} alt={whitelabel?.companyName || "Atendechat"} />
				</div>
				{/*<Typography component="h1" variant="h5">
					{i18n.t("login.title")}
				</Typography>*/}
				<form className={classes.form} noValidate onSubmit={handlSubmit}>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label={i18n.t("login.form.email")}
						name="email"
						value={user.email}
						onChange={handleChangeInput}
						autoComplete="email"
						autoFocus
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label={i18n.t("login.form.password")}
						type={showPassword ? "text" : "password"}
						id="password"
						value={user.password}
						onChange={handleChangeInput}
						autoComplete="current-password"
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										aria-label="alternar visibilidade da senha"
										onClick={handleTogglePasswordVisibility}
										edge="end"
										style={{ minWidth: 48, minHeight: 48 }}
										title={showPassword ? "Ocultar senha" : "Mostrar senha"}
									>
										{showPassword ? <Visibility /> : <VisibilityOff />}
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
					
					{/* <Grid container justify="flex-end">
					  <Grid item xs={6} style={{ textAlign: "right" }}>
						<Link component={RouterLink} to="/forgetpsw" variant="body2">
						  Esqueceu sua senha?
						</Link>
					  </Grid>
					</Grid>*/}
					
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						{i18n.t("login.buttons.submit")}
					</Button>
					{ <Grid container>
						<Grid item>
							<Link
								href="#"
								variant="body2"
								component={RouterLink}
								to="/signup"
							>
								{i18n.t("login.buttons.register")}
							</Link>
						</Grid>
					</Grid> }
				</form>
			
			</div>
			<Box mt={8}><Copyright /></Box>
		</Container>
		</div>
	);
};

export default Login;
