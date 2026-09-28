import { BiodataFormState } from '../types';

export const BRIDE_FORM_RESPONSE_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSc0IoS0iXO2MWnVdVlfv350v6poJfC3Xjt6pWANiz7eUFFx-A/formResponse';

export const GROOM_FORM_RESPONSE_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSd-RmeeKJH30LxIbbSQ7G1wm8_0kp3ulUFnbMIdjK_8PBbqaA/formResponse';

/**
 * Silently submits biodata directly into Google Form backend
 * without redirecting user or showing Google branding.
 */
export async function submitBiodataHeadless(formData: BiodataFormState): Promise<boolean> {
  try {
    const isBride = formData.gender === 'bride';
    const targetUrl = isBride ? BRIDE_FORM_RESPONSE_URL : GROOM_FORM_RESPONSE_URL;

    // Split Date of Birth into year, month, day if present
    let dobYear = '';
    let dobMonth = '';
    let dobDay = '';
    if (formData.dob) {
      const parts = formData.dob.split('-');
      if (parts.length === 3) {
        dobYear = parts[0];
        dobMonth = parts[1];
        dobDay = parts[2];
      }
    }

    // Bride Google Form entry mapping (extracted from public form)
    const bridePayload: Record<string, string> = {
      'entry.518193544': formData.caste || 'No',
      'entry.811905006': formData.subcaste || 'No',
      'entry.1699850673': formData.fullName || 'No',
      'entry.2014374918': formData.surname || 'No',
      'entry.1547806113_year': dobYear,
      'entry.1547806113_month': dobMonth,
      'entry.1547806113_day': dobDay,
      'entry.767566259': formData.birthTime || 'No',
      'entry.1005055574': formData.rashi || 'No',
      'entry.525173791': formData.height || 'No',
      'entry.1084616483': formData.varna || 'No',
      'entry.1915387596': formData.bloodGroup || 'No',
      'entry.725008682': formData.education || 'No',
      'entry.207025219': formData.currentJob || 'No',
      'entry.2132423987': formData.salary || 'No',
      'entry.384801315': formData.agriculture || 'No',
      'entry.2045788750': formData.address || 'No',
      'entry.1980533383': formData.nativeVillage || 'No',
      'entry.95444256': formData.fatherName || 'No',
      'entry.1892397417': formData.uncleName || 'No',
      'entry.1006834062': formData.sister || 'No',
      'entry.2044450838': formData.brother || 'No',
      'entry.979855452': formData.mamaName || 'No',
      'entry.1519402604': formData.mamaVillage || 'No',
      'entry.811395852': formData.expectations || 'No',
      'entry.1493614442': formData.relations || 'No',
      'entry.1635450781': formData.contactNumber || 'No',
      'entry.121267535': formData.email || 'No',
    };

    // Construct a silent hidden form in DOM to bypass cross-origin browser fetch restrictions
    const hiddenIframeName = 'hidden_gform_iframe_' + Date.now();
    const iframe = document.createElement('iframe');
    iframe.name = hiddenIframeName;
    iframe.id = hiddenIframeName;
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    const form = document.createElement('form');
    form.action = targetUrl;
    form.method = 'POST';
    form.target = hiddenIframeName;
    form.style.display = 'none';

    // Populate form data
    const fieldsToSubmit = isBride ? bridePayload : bridePayload;
    Object.entries(fieldsToSubmit).forEach(([key, val]) => {
      if (val) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = val;
        form.appendChild(input);
      }
    });

    document.body.appendChild(form);
    form.submit();

    // Cleanup after short delay
    setTimeout(() => {
      try {
        document.body.removeChild(form);
        document.body.removeChild(iframe);
      } catch {
        // ignore
      }
    }, 2000);

    return true;
  } catch (err) {
    console.error('Silent form submit error:', err);
    return false;
  }
}

/**
 * Prepares pre-formatted WhatsApp message for instant 1-click verification & dispatch
 */
export function generateWhatsAppBiodataUrl(formData: BiodataFormState): string {
  const genderLabel = formData.gender === 'bride' ? 'वधू (मुलगी)' : 'वर (मुलगा)';
  const message = `*लग्न एक पवित्र बंधन - नवीन बायोडाटा नोंदणी*
--------------------------------
*प्रकार:* ${genderLabel}
*नाव:* ${formData.fullName} ${formData.surname}
*जात / उपजात:* ${formData.caste} / ${formData.subcaste}
*जन्म तारीख:* ${formData.dob || 'माहिती नाही'} (वेळ: ${formData.birthTime || 'माहिती नाही'})
*रास व उंची:* ${formData.rashi || '-'}, ${formData.height || '-'}
*शिक्षण:* ${formData.education || '-'}
*नोकरी / व्यवसाय:* ${formData.currentJob || '-'}
*वेतन:* ${formData.salary || '-'}
*पत्ता व मूळगाव:* ${formData.address || '-'} (${formData.nativeVillage || '-'})
*वडिलांचे नाव:* ${formData.fatherName || '-'}
*मामांचे नाव व गाव:* ${formData.mamaName || '-'} (${formData.mamaVillage || '-'})
*अपेक्षा:* ${formData.expectations || '-'}
*संपर्क क्रमांक:* ${formData.contactNumber}
*ईमेल:* ${formData.email || '-'}
--------------------------------
कृपया हा बायोडाटा पडताळणी करून लग्न एक पवित्र बंधन मंचावर जोडावा.`;

  return `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
}
