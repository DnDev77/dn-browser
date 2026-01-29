local Tunnel = module("vrp","lib/Tunnel")
local Proxy = module("vrp","lib/Proxy")
vRP = Proxy.getInterface("vRP")

H2 = {}
Tunnel.bindInterface(GetCurrentResourceName(), H2)
vSERVER = Tunnel.getInterface(GetCurrentResourceName())

opened = false
currentSessionToken = nil
passport = 0
clientConfig = {}

function getPassport()
    return vSERVER.Passport()
end

function loadClientConfig()
    clientConfig = vSERVER.GetConfig()
end

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(Config.Cache.autoSaveInterval)
        if opened then
            local user_id = getPassport()
            if user_id then
                SendNUIMessage({
                    action = 'requestSave',
                    userId = tostring(user_id)
                })
            end
        end
    end
end)

-- initialization

Citizen.CreateThread(function()
    loadClientConfig()
end)
