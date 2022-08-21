import ReceitaDiv from './receitaDiv.js';
import DrugsForm from './drugsForm.js';

export default class ReceitaApp {
  constructor() {
    this.prescriptionHandler = null;
    this.drugsHandler = null;
  }
    
  finishStart = function(drugsList) {
    this.prescriptionHandler = new ReceitaDiv(this);
    this.prescriptionHandler.switchPrescriptionMode(false);
    this.drugsHandler = new DrugsForm(this, drugsList);
    this.drugsHandler.buildForm();
  }

  loadDrugsList = async function (callback) {
    var DRUGS_JSON_URL = '/drugs';
    var contents = null;
    return fetch(DRUGS_JSON_URL).then(response => response.json());
  };
  
  start = function () {
    const dateOpts = { year: 'numeric', month: 'numeric', day: 'numeric' };
    var today = new Date();
    var dateText = today.toLocaleDateString('pt-BR', dateOpts);
    document.querySelectorAll('span.autofill-date').forEach(function (p) {
      p.innerText = dateText;
    });
    this.loadDrugsList().then(this.finishStart.bind(this));
  }

  generatePrescription = function () {
    var selectedDrugs = this.drugsHandler.getSelectedDrugs();
    this.prescriptionHandler.renderDrugs(selectedDrugs);
  }

  toggleGroupBySchedule = function (groupBySchedule) {
    this.prescriptionHandler.group_by = (groupBySchedule ? "schedule" : "route");
    this.generatePrescription();
  }

  toggleSpecialPrescription = function (enableSpecialPrescription) {
    // Gather patient name.
    var oldPatientField = document.querySelector('div.prescription-form.enabled input[name="patient-name"]');
    var oldPatientName = "";
    if (oldPatientField != null) {
      oldPatientName = oldPatientField.value;
    }
    this.prescriptionHandler.switchPrescriptionMode(enableSpecialPrescription);
    this.generatePrescription();
    // Restore patient name in new patient field.
    var patientField = document.querySelector('div.prescription-form.enabled input[name="patient-name"]');
    patientField.value = oldPatientName;
  }


}
