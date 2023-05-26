export function setDialHandPosition(percentage) {
    let dialVal = document.getElementById("dial-value");
    const degrees = (percentage / 100) * 180;
    dialVal.innerHTML = percentage + "%";
    hand.style.transform = `translate(0, -50%) rotate(${degrees - 90}deg)`;
    return degrees;
}

export function setDialHandInvertedPosition(percentage) {
    let dialValInv = document.getElementById("dial-value-inverted");
    const degrees = (percentage / 100) * 180;
    dialValInv.innerHTML = percentage + "%";
    handInv.style.transform = `translate(0, -50%) rotate(${180 - degrees + 90}deg)`;
    return degrees;
}