// Credit Knayi Font Detector Script
var library = {};
var mmCharacterRange = /[\u1000-\u109F]/;
var whitespace = '[\\x20\\t\\r\\n\\f]';

/** DETECTION Libarary **/
library.detect = {
  unicode: [
    '\u103e', '\u103f', '\u100a\u103a', '\u1014\u103a', '\u1004\u103a', '\u1031\u1038', '\u1031\u102c',
    '\u103a\u1038', '\u1035', '[\u1050-\u1059]', '^([\u1000-\u1021]\u103c|[\u1000-\u1021]\u1031)'
  ],
  zawgyi : [
    '\u102c\u1039', '\u103a\u102c', whitespace+'(\u103b|\u1031|[\u107e-\u1084])[\u1000-\u1021]'
    ,'^(\u103b|\u1031|[\u107e-\u1084])[\u1000-\u1021]', '[\u1000-\u1021]\u1039[^\u1000-\u1021]', '\u1025\u1039'
    ,'\u1039\u1038' ,'[\u102b-\u1030\u1031\u103a\u1038](\u103b|[\u107e-\u1084])[\u1000-\u1021]' ,'\u1036\u102f'
    ,'[\u1000-\u1021]\u1039\u1031' , '\u1064','\u1039'+whitespace, '\u102c\u1031'
    ,'[\u102b-\u1030\u103a\u1038]\u1031[\u1000-\u1021]', '\u1031\u1031', '\u102f\u102d', '\u1039$'
  ]
};

// Populate Detect library as Regex
for(var type in library.detect) {
  for (var i = 0; i < library.detect[type].length; i++) {
    library.detect[type][i] = new RegExp(library.detect[type][i], 'g');
  }
}

/**
 * Font Type Detector agent
 * @param content Text to make a detection
 * @param def Default return format;
 * @return unicode ? zawgyi
 */
function fontDetect(content, fallback_font_type){
  if (!content) {
    return fallback_font_type || 'en';
  }

	if (content === '')
		return content;

	if (!mmCharacterRange.test(content))
		return fallback_font_type || 'en';

	content = content.trim().replace(/[\u200B\u200C]/g, '');
	fallback_font_type = fallback_font_type || 'zawgyi';

   var match = {};

    for (var type in library.detect) {
  		match[type] = 0;

  		for (var i = 0; i < library.detect[type].length; i++) {
  			var rule = library.detect[type][i]
  			var m = content.match(rule);
  			match[type] += (m && m.length) || 0;
  		}
  	}

    if (match.unicode > match.zawgyi) {
  		return 'unicode';
  	} else if (match.unicode < match.zawgyi) {
  		return 'zawgyi';
  	} else {
  		return fallback_font_type;
  	}
};