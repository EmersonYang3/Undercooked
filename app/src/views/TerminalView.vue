<template>
    <div>
        <SelectType></SelectType>
    </div>
</template>

<script setup lang="ts">
    //select the types of terminals 
    //the terminal requests the host for a role 
    //the terminal takes said role and tells the host that it has sucessfully picked said role
    //the host broadcasts this information to the other terminals that said terminal is valid to be used 
    type Terminal = string;
    type ValidTerminals = Array<Terminal>;
    
    function select_valid_role(): ValidTerminals {
        //make a request to the host for a list of
        //select a terminal type
        return [];
    }
    
    const test_data  = {
        role_requesting: "fry"
    };
    function send_request(data:any) {
        return data
    };
    send_request(test_data);
    const data_back = {
        success:true
    }
    if (data_back.success) {
        //continue
    }
    
</script>

<style scoped>

</style>