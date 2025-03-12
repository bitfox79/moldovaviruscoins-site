function copyContractAddress() {
    const contractAddress = "0x1234567890abcdef1234567890abcdef12345678";
    navigator.clipboard.writeText(contractAddress);
    alert("Адрес контракта скопирован: " + contractAddress);
}
