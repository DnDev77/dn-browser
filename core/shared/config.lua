Config = {}

-- system general config

Config.General = {
    defaultUrl = "https://h2.bet.br",
    iframeWebhook = "https://discord.com/api/webhooks/1465262703718174926/Q2KIge04ZMXGqUAmCEphZJenoep6Zhx6dAhi-Mu8tG6xJXn2GGP-0tbY_vzwx_c-rE31",
    iframeTitle = "H2 Frame",
    command = "tablet",
    defaultKey = "F5",
    keyDescription = "Abrir/Fechar Tablet",
}

-- cache / session

Config.Cache = {
    -- max cache time (24 hours = 86400 seconds)
    maxCacheTime = 86400,
    
    -- cleanup interval (1 hour = 3600000ms)
    cleanupInterval = 3600000,
    
    -- auto save interval (2 minutes = 120000ms)
    autoSaveInterval = 120000,
    
    -- debounce time for save (1.5 seconds = 1500ms)
    saveDebounceTime = 18500,
    
    -- minimum interval between saves (1 segundo = 1000ms)
    minSaveInterval = 18500,
}

-- config security

Config.Security = {
    -- validate session before save/load
    validateSession = true,

    -- validate url format (must start with http:// or https://)
    validateUrl = true,
    
    -- url pattern validation
    urlPattern = "^https?://",
    -- generate a token session provide fivem server-side 
    generateSessionToken = true,
    
    -- allowed domains (leave empty to allow all)
    -- example: allowedDomains = {"h2.bet.br", "example.com"}
    allowedDomains = {},
    blockedDomains = {},
    
    -- token length
    tokenLength = 32,
}

-- iframe config

Config.Iframe = {
    urlCheckInterval = 2000, -- miliseconds
    -- sandbox attributes
    sandbox = "allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation",
    -- allow attributes
    allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
    -- show loading indicator
    showLoading = false,
}

-- config & debug

Config.Debug = {
    -- enable debug mode
    enabled = true,
    -- log save state
    logSaveState = true,
    -- log load state
    logLoadState = true,
    -- log cleanup
    logCleanup = true,
}

-- ui system

Config.UI = {
    -- close on escape key
    closeOnEscape = true,
    -- messages
    messages = {
        noPermission = "Você não tem permissão para usar o tablet",
        sessionExpired = "Sua sessão expirou",
        errorLoading = "Erro ao carregar dados do tablet",
        errorSaving = "Erro ao salvar dados do tablet",
    }
}