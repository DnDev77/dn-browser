RegisterNetEvent("tablet:receiveState")
AddEventHandler("tablet:receiveState", function(data)
    local user_id = getPassport()
    
    if data and data.sessionToken then
        currentSessionToken = data.sessionToken
    end
    
    local configToSend = data and data.config or {
        defaultUrl = Config.General.defaultUrl,
        iframeTitle = Config.General.iframeTitle,
        showLoading = Config.Iframe.showLoading,
    }
    
    SendNUIMessage({
        action = 'setVisible',
        visible = true,
        userId = tostring(user_id),
        savedState = data,
        config = configToSend
    })
end)