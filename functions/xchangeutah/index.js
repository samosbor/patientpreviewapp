module.exports = async function (context, myBlob) {
    var file = JSON.parse(myBlob.toString())

    file.Default.forEach(element => {
        var row = fixRow(element)

    });

    context.log("JavaScript blob trigger function processed blob \n Blob:", context.bindingData.blobTrigger, "\n Blob Size:", myBlob.length, "Bytes");
};

function fixRow(row) {
    var CaseName = row.CaseName
    var CauseOfAction = ""
    var Plaintiff = getPlaintiff(row)
    var Defendant = getDefendant(row)
    var CaseNumber = row.CaseNumber
    var DateFiled = row.FilingDate
    var Court = row.CourtLocation
    var PresidingJudge = row.CurrentAssignedJudge
    var ReferringJudge = ""
    var NatureOfSuit = row.CaseType
    var CauseOfActionNumber = ""
    var JuryDemandedBy = ""
    var County = row.County
    var State = "Utah"
}

function getPlaintiff(row) {
    var Plaintiff = ""
    if (row.Plaintiff1 !== "")
        Plaintiff += row.Plaintiff1
    if (row.Plaintiff2 != "")
        Plaintiff = Plaintiff + ", " + row.Plaintiff2
    if (row.Plaintiff3 != "")
        Plaintiff = Plaintiff + ", " + row.Plaintiff3
    if (row.Plaintiff4 != "")
        Plaintiff = Plaintiff + ", " + row.Plaintiff4
    if (row.Plaintiff5 != "")
        Plaintiff = Plaintiff + ", " + row.Plaintiff5
    if (row.Plaintiff6 != "")
        Plaintiff = Plaintiff + ", " + row.Plaintiff6
    if (row.Plaintiff7 != "")
        Plaintiff = Plaintiff + ", " + row.Plaintiff7
    if (row.Plaintiff8 != "")
        Plaintiff = Plaintiff + ", " + row.Plaintiff8
    if (row.Plaintiff9 != "")
        Plaintiff = Plaintiff + ", " + row.Plaintiff9
    if (row.Plaintiff10 != "")
        Plaintiff = Plaintiff + ", " + row.Plaintiff10

    return Plaintiff
}

function getDefendant(row) {
    var Defendant = ""
    if (row.Defendant1 !== "")
        Defendant += row.Defendant1
    if (row.Defendant2 != "")
        Defendant = Defendant + ", " + row.Defendant2
    if (row.Defendant3 != "")
        Defendant = Defendant + ", " + row.Defendant3
    if (row.Defendant4 != "")
        Defendant = Defendant + ", " + row.Defendant4
    if (row.Defendant5 != "")
        Defendant = Defendant + ", " + row.Defendant5
    if (row.Defendant6 != "")
        Defendant = Defendant + ", " + row.Defendant6
    if (row.Defendant7 != "")
        Defendant = Defendant + ", " + row.Defendant7
    if (row.Defendant8 != "")
        Defendant = Defendant + ", " + row.Defendant8
    if (row.Defendant9 != "")
        Defendant = Defendant + ", " + row.Defendant9
    if (row.Defendant10 != "")
        Defendant = Defendant + ", " + row.Defendant10

    return Defendant
}