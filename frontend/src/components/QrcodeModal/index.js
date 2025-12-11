import React, { useEffect, useState, useContext } from "react";
import QRCode from "qrcode.react";
import toastError from "../../errors/toastError";

import { Dialog, DialogContent, Paper, Typography, useTheme } from "@material-ui/core";
import { i18n } from "../../translate/i18n";
import api from "../../services/api";
import { SocketContext } from "../../context/Socket/SocketContext";

const QrcodeModal = ({ open, onClose, whatsAppId }) => {
  const [qrCode, setQrCode] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [attempt, setAttempt] = useState(1);
  const theme = useTheme();

  const socketManager = useContext(SocketContext);

  useEffect(() => {
    const fetchSession = async () => {
      if (!whatsAppId) return;

      try {
        const { data } = await api.get(`/whatsapp/${whatsAppId}`);
        setQrCode(data.qrcode);
      } catch (err) {
        toastError(err);
      }
    };
    fetchSession();
  }, [whatsAppId]);

  // Contador regressivo do QR Code
  useEffect(() => {
    if (!qrCode || countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [qrCode, countdown]);

  useEffect(() => {
    if (!whatsAppId) return;
    const companyId = localStorage.getItem("companyId");
    const socket = socketManager.getSocket(companyId);

    socket.on(`company-${companyId}-whatsappSession`, (data) => {
      if (data.action === "update" && data.session.id === whatsAppId) {
        setQrCode(data.session.qrcode);
        if (data.session.qrcode) {
          setCountdown(60); // Reseta contador quando novo QR chegar
          setAttempt((prev) => prev + 1);
        }
      }

      if (data.action === "update" && data.session.qrcode === "") {
        onClose();
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [whatsAppId, onClose, socketManager]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" scroll="paper">
      <DialogContent>
        <Paper elevation={0} style={{ display: "flex", alignItems: "center" }}>
          <div style={{ marginRight: "20px" }}>
            <Typography variant="h2" component="h2" color="textPrimary" gutterBottom style={{ fontFamily: "Montserrat", fontWeight: "bold", fontSize:"20px",}}>
              {i18n.t("qrCodeModal.title")}
            </Typography>
            <Typography variant="body1" color="textPrimary" gutterBottom>
              {i18n.t("qrCodeModal.steps.one")}
            </Typography>
            <Typography variant="body1" color="textPrimary" gutterBottom>
              {i18n.t("qrCodeModal.steps.two.partOne")} <svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg> {i18n.t("qrCodeModal.steps.two.partTwo")} <svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"></path></svg> {i18n.t("qrCodeModal.steps.two.partThree")}
            </Typography>
            <Typography variant="body1" color="textPrimary" gutterBottom>
              {i18n.t("qrCodeModal.steps.three")}
            </Typography>
            <Typography variant="body1" color="textPrimary" gutterBottom>
              {i18n.t("qrCodeModal.steps.four")}
            </Typography>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{
              padding: "20px",
              background: "#fff",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: "300px",
              minHeight: "300px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}>
              {qrCode ? (
                <QRCode
                  value={qrCode}
                  size={280}
                  level="H"
                  includeMargin={true}
                  bgColor="#FFFFFF"
                  fgColor="#000000"
                  renderAs="svg"
                  imageSettings={{
                    height: 40,
                    width: 40,
                    excavate: true,
                  }}
                />
              ) : (
                <Typography variant="body1" color="textSecondary">
                  {i18n.t("qrCodeModal.waiting")}
                </Typography>
              )}
            </div>
            {qrCode && (
              <div style={{ marginTop: "16px", textAlign: "center" }}>
                <Typography variant="body2" color="textSecondary" style={{ marginBottom: "8px" }}>
                  ⏱️ Tempo restante: <strong>{countdown}s</strong>
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Tentativa: {attempt}/3
                </Typography>
                {countdown <= 10 && (
                  <Typography variant="caption" color="error" style={{ display: "block", marginTop: "8px" }}>
                    ⚠️ QR Code expirando! Um novo será gerado automaticamente.
                  </Typography>
                )}
              </div>
            )}
          </div>
        </Paper>
      </DialogContent>
    </Dialog>
  );
};

export default React.memo(QrcodeModal);
