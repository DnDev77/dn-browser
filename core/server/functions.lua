function cleanExpiredData()
    local currentTime = os.time()
    local expiredUsers = {}
    
    for user_id, data in pairs(tabletData) do
        if data.timestamp and (currentTime - data.timestamp) > Config.Cache.maxCacheTime then
            table.insert(expiredUsers, user_id)
        end
    end
    
    for _, user_id in ipairs(expiredUsers) do
        tabletData[user_id] = nil
        sessionTokens[user_id] = nil
        Config.DebugLog("Cleanup", string.format("Dados expirados removidos para user_id: %s", user_id))
    end
    
    if #expiredUsers > 0 then
        Config.DebugLog("Cleanup", string.format("Limpeza concluída: %d usuários removidos", #expiredUsers))
    end
end

function generateSessionToken(user_id)
    if not Config.Security.generateSessionToken then
        return nil
    end
    
    local function generateToken(length)
        local chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
        local token = {}

        for i = 1, length do
            local index = math.random(1, #chars)
            token[i] = chars:sub(index, index)
        end

        return table.concat(token)
    end

    local token = generateToken(Config.Security.tokenLength)
    
    sessionTokens[user_id] = token
    
    Config.DebugLog("SaveState", string.format("Token gerado para user_id: %s, token: %s", user_id, token))
    
    return token
end

function validateSession(user_id, source)
    if not Config.Security.validateSession then
        return true
    end
    
    local player = vRP.Source(user_id)
    return player == source
end