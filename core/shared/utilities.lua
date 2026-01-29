function Config.IsUrlAllowed(url)
    if #Config.Security.allowedDomains == 0 then
        return true
    end
    
    for _, domain in ipairs(Config.Security.allowedDomains) do
        if string.find(url, domain) then
            return true
        end
    end
    
    return false
end

function Config.IsUrlBlocked(url)
    for _, domain in ipairs(Config.Security.blockedDomains) do
        if string.find(url, domain) then
            return true
        end
    end
    
    return false
end

function Config.ValidateUrl(url)
    if not Config.Security.validateUrl then
        return true
    end
    
    if not string.match(url, Config.Security.urlPattern) then
        return false
    end
    
    if Config.IsUrlBlocked(url) then
        return false
    end
    
    if not Config.IsUrlAllowed(url) then
        return false
    end
    
    return true
end

function Config.DebugLog(category, message)
    if Config.Debug.enabled then
        local logEnabled = Config.Debug["log" .. category]
        if logEnabled == nil or logEnabled then
            print(string.format("[TABLET DEBUG - %s] %s", category, message))
        end
    end
end