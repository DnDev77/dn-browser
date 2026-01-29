RegisterNUICallback('closeTablet', function(data, cb)
    opened = false
    SetNuiFocus(false, false)
    SendNUIMessage({
        action = 'setVisible',
        visible = false
    })
    cb('ok')
end)

RegisterNUICallback('saveIframeData', function(data, cb)
    local user_id = getPassport()
    if user_id and data.state then
        TriggerServerEvent("tablet:saveState", user_id, data.state)
    end
    cb('ok')
end)

RegisterNUICallback('requestConfig', function(data, cb)
    cb({
        defaultUrl = Config.General.defaultUrl,
        iframeTitle = Config.General.iframeTitle,
        sandbox = Config.Iframe.sandbox,
        allow = Config.Iframe.allow,
        urlCheckInterval = Config.Iframe.urlCheckInterval,
        saveDebounceTime = Config.Cache.saveDebounceTime,
        minSaveInterval = Config.Cache.minSaveInterval,
        closeOnEscape = Config.UI.closeOnEscape,
    })
end)