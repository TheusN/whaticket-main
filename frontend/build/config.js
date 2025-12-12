// Configuração em runtime - este arquivo é carregado ANTES do React
// Edite este arquivo para alterar a URL do backend SEM precisar rebuild
window.RUNTIME_CONFIG = {
  // Para PRODUÇÃO: coloque a URL do seu backend aqui
  // BACKEND_URL: "https://atendeapi.omniwhats.com",

  // Para DESENVOLVIMENTO LOCAL: use localhost
  // BACKEND_URL: "http://localhost:8080",

  // AUTO-DETECT: deixe vazio para detectar automaticamente
  // - Em localhost: usa http://localhost:8080
  // - Em produção: usa o mesmo domínio com prefixo "api."
  BACKEND_URL: "",

  // Outras configurações
  HOURS_CLOSE_TICKETS_AUTO: 24,
};
