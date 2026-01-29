RegisterCommand(Config.General.command, function()
    local user_id = getPassport()
    if user_id then
        opened = not opened
        SetNuiFocus(opened, opened)
        
        if opened then
            TriggerServerEvent("tablet:loadState", user_id)
        else
            SendNUIMessage({
                action = 'setVisible',
                visible = false
            })
        end
    end
end, false)

RegisterKeyMapping(
    Config.General.command, 
    Config.General.keyDescription, 
    'keyboard', 
    Config.General.defaultKey
)
