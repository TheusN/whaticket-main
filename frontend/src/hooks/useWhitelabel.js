import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../services/api";

const useWhitelabel = () => {
  const [loading, setLoading] = useState(false);
  const [whitelabel, setWhitelabel] = useState(null);

  useEffect(() => {
    fetchWhitelabel();
  }, []);

  const fetchWhitelabel = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/whitelabel");
      setWhitelabel(data);
    } catch (error) {
      // Silenciosamente ignora erros - whitelabel é opcional
      // Erro 404: não existe ainda
      // Erro 500: tabela pode não existir (migration pendente)
      setWhitelabel(null);
    } finally {
      setLoading(false);
    }
  };

  const createWhitelabel = async (data) => {
    setLoading(true);
    try {
      const response = await api.post("/whitelabel", data);
      setWhitelabel(response.data);
      toast.success("WhiteLabel criado com sucesso!");
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.error || "Erro ao criar WhiteLabel");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateWhitelabel = async (data) => {
    setLoading(true);
    try {
      const response = await api.put("/whitelabel", data);
      setWhitelabel(response.data);
      toast.success("WhiteLabel atualizado com sucesso!");
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.error || "Erro ao atualizar WhiteLabel");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (field, file) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append(field, file);

      const response = await api.post("/whitelabel/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      setWhitelabel(response.data.whitelabel);
      toast.success(`${field} enviado com sucesso!`);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.error || `Erro ao enviar ${field}`);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteImage = async (field) => {
    setLoading(true);
    try {
      await api.delete(`/whitelabel/image/${field}`);

      // Atualizar estado local
      setWhitelabel(prev => ({
        ...prev,
        [field]: null
      }));

      toast.success(`${field} removido com sucesso!`);
    } catch (error) {
      toast.error(error?.response?.data?.error || `Erro ao remover ${field}`);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    whitelabel,
    loading,
    fetchWhitelabel,
    createWhitelabel,
    updateWhitelabel,
    uploadImage,
    deleteImage
  };
};

export default useWhitelabel;
