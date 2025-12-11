import React from 'react';
import { TextField, InputAdornment, FormHelperText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: theme.palette.inputBackground,
            transition: 'all 0.2s ease',
            border: '2px solid transparent',

            '&:hover': {
                borderColor: theme.palette.mode === 'light'
                    ? 'rgba(139, 92, 246, 0.3)'
                    : 'rgba(139, 92, 246, 0.5)',
            },

            '&.Mui-focused': {
                borderColor: theme.palette.primary.main,
                boxShadow: theme.palette.mode === 'light'
                    ? '0 0 0 4px rgba(139, 92, 246, 0.1)'
                    : '0 0 0 4px rgba(139, 92, 246, 0.2)',
            },

            '&.Mui-error': {
                borderColor: theme.palette.error.main,

                '&.Mui-focused': {
                    boxShadow: theme.palette.mode === 'light'
                        ? '0 0 0 4px rgba(239, 68, 68, 0.1)'
                        : '0 0 0 4px rgba(239, 68, 68, 0.2)',
                },
            },

            '&.Mui-disabled': {
                backgroundColor: theme.palette.mode === 'light'
                    ? '#F5F5F5'
                    : '#1A1A1A',
                opacity: 0.6,
            },

            '& fieldset': {
                border: 'none',
            },
        },

        '& .MuiInputLabel-root': {
            fontWeight: 500,
            color: theme.palette.text.secondary,

            '&.Mui-focused': {
                color: theme.palette.primary.main,
            },

            '&.Mui-error': {
                color: theme.palette.error.main,
            },
        },

        '& .MuiInputBase-input': {
            padding: '14px 16px',
            fontSize: '0.938rem',
            fontWeight: 400,

            '&::placeholder': {
                color: theme.palette.text.disabled,
                opacity: 1,
            },
        },

        '& .MuiInputAdornment-root': {
            color: theme.palette.text.secondary,

            '& svg': {
                fontSize: 20,
            },
        },
    },

    // Sizes
    small: {
        '& .MuiInputBase-input': {
            padding: '10px 12px',
            fontSize: '0.875rem',
        },
    },

    large: {
        '& .MuiInputBase-input': {
            padding: '18px 20px',
            fontSize: '1rem',
        },
    },

    // Success state
    success: {
        '& .MuiOutlinedInput-root': {
            borderColor: theme.palette.success.main,

            '&.Mui-focused': {
                boxShadow: theme.palette.mode === 'light'
                    ? '0 0 0 4px rgba(16, 185, 129, 0.1)'
                    : '0 0 0 4px rgba(16, 185, 129, 0.2)',
            },
        },

        '& .MuiInputLabel-root.Mui-focused': {
            color: theme.palette.success.main,
        },
    },

    // Helper text
    helperText: {
        marginTop: 8,
        fontSize: '0.813rem',
        fontWeight: 400,
        display: 'flex',
        alignItems: 'center',
        gap: 4,

        '& svg': {
            fontSize: 16,
        },
    },

    successText: {
        color: theme.palette.success.main,
    },

    errorText: {
        color: theme.palette.error.main,
    },
}));

const Input = ({
    label,
    placeholder,
    value,
    onChange,
    onBlur,
    onFocus,
    type = 'text',
    name,
    error = false,
    success = false,
    helperText,
    disabled = false,
    required = false,
    fullWidth = true,
    multiline = false,
    rows = 4,
    maxRows,
    startAdornment,
    endAdornment,
    size = 'medium', // small, medium, large
    className = '',
    inputProps = {},
    ...props
}) => {
    const classes = useStyles();

    const rootClasses = [
        classes.root,
        classes[size],
        success && classes.success,
        className,
    ].filter(Boolean).join(' ');

    return (
        <div>
            <TextField
                className={rootClasses}
                label={label}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus}
                type={type}
                name={name}
                error={error}
                disabled={disabled}
                required={required}
                fullWidth={fullWidth}
                multiline={multiline}
                rows={multiline ? rows : undefined}
                maxRows={maxRows}
                variant="outlined"
                InputProps={{
                    startAdornment: startAdornment && (
                        <InputAdornment position="start">{startAdornment}</InputAdornment>
                    ),
                    endAdornment: endAdornment && (
                        <InputAdornment position="end">{endAdornment}</InputAdornment>
                    ),
                }}
                inputProps={inputProps}
                {...props}
            />
            {helperText && (
                <FormHelperText
                    className={`${classes.helperText} ${error ? classes.errorText : success ? classes.successText : ''}`}
                >
                    {helperText}
                </FormHelperText>
            )}
        </div>
    );
};

export default Input;
