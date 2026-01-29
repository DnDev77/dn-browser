RegisterServerEvent("tablet:saveState")
AddEventHandler("tablet:saveState", function(user_id, state)
    local source = source
    
    if not user_id or not state then
        Config.DebugLog("SaveState", "Dados inválidos recebidos")
        return
    end
    
    if not validateSession(user_id, source) then
        Config.DebugLog("SaveState", string.format("Sessão inválida para user_id: %s", user_id))
        return
    end
    
    if state.url and type(state.url) == "string" then
        if not Config.ValidateUrl(state.url) then
            Config.DebugLog("SaveState", string.format("URL inválida ou bloqueada: %s", state.url))
            return
        end
        
        tabletData[user_id] = {
            url = state.url,
            timestamp = state.timestamp or os.time(),
            sessionToken = sessionTokens[user_id] or generateSessionToken(user_id)
        }
        
        Config.DebugLog("SaveState", string.format("Estado salvo para user_id: %s | URL: %s | Token: %s", user_id, state.url, sessionTokens[user_id]))
    end
end)

RegisterServerEvent("tablet:loadState")
AddEventHandler("tablet:loadState", function(user_id)
    local source = source
    
    if not user_id then
        Config.DebugLog("LoadState", "user_id não fornecido")
        return
    end
    
    if not validateSession(user_id, source) then
        Config.DebugLog("LoadState", string.format("Sessão inválida para user_id: %s", user_id))
        TriggerClientEvent("tablet:receiveState", source, nil)
        return
    end
    
    cleanExpiredData()
    
    if tabletData[user_id] then
        local token = sessionTokens[user_id] or generateSessionToken(user_id)
        
        local stateToSend = {
            url = tabletData[user_id].url,
            sessionToken = token,
            config = {
                defaultUrl = Config.General.defaultUrl,
                iframeTitle = Config.General.iframeTitle,
                showLoading = Config.Iframe.showLoading,
            }
        }
        
        Config.DebugLog("LoadState", string.format("Estado carregado para user_id: %s | URL: %s", user_id, tabletData[user_id].url))
        TriggerClientEvent("tablet:receiveState", source, stateToSend)
    else
        generateSessionToken(user_id)
        
        local defaultState = {
            url = Config.General.defaultUrl,
            sessionToken = sessionTokens[user_id],
            config = {
                defaultUrl = Config.General.defaultUrl,
                iframeTitle = Config.General.iframeTitle,
                showLoading = Config.Iframe.showLoading,
            }
        }
        
        Config.DebugLog("LoadState", string.format("Estado padrão enviado para user_id: %s", user_id))
        TriggerClientEvent("tablet:receiveState", source, defaultState)
    end
end)

RegisterServerEvent("tablet:clearState")
AddEventHandler("tablet:clearState", function(user_id)
    local source = source
    
    if not user_id then
        return
    end
    
    if not validateSession(user_id, source) then
        Config.DebugLog("ClearState", string.format("Sessão inválida para user_id: %s", user_id))
        return
    end
    
    tabletData[user_id] = nil
    sessionTokens[user_id] = nil
    
    Config.DebugLog("ClearState", string.format("Estado limpo para user_id: %s", user_id))
end)

RegisterNetEvent('tablet:cloudflareVerified')
AddEventHandler('tablet:cloudflareVerified', function(playerId, sessionData)
    local playerSessions = {}
    playerSessions[playerId] = {
        cookies = sessionData.cookies,
        timestamp = os.time(),
        expiresIn = 3600 -- 1 hora
    }
    
    TriggerClientEvent('tablet:injectSession', playerId, sessionData)
end)