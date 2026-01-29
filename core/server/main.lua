local Tunnel = module("vrp","lib/Tunnel")
local Proxy = module("vrp","lib/Proxy")
vRP = Proxy.getInterface("vRP")

H2 = {}
Tunnel.bindInterface(GetCurrentResourceName(), H2)
vCLIENT = Tunnel.getInterface(GetCurrentResourceName())

tabletData = {}
sessionTokens = {}

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(Config.Cache.cleanupInterval)
        cleanExpiredData()
    end
end)

function H2.Passport()
    local src = source
    return vRP.Passport(src)
end

function H2.GetConfig()
    return {
        defaultUrl = Config.General.defaultUrl,
        iframeTitle = Config.General.iframeTitle,
        sandbox = Config.Iframe.sandbox,
        allow = Config.Iframe.allow,
        urlCheckInterval = Config.Iframe.urlCheckInterval,
        saveDebounceTime = Config.Cache.saveDebounceTime,
        minSaveInterval = Config.Cache.minSaveInterval,
        closeOnEscape = Config.UI.closeOnEscape,
    }
end