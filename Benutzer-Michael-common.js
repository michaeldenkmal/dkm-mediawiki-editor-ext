// https://www.mediawiki.org/wiki/Extension:WikiEditor/Toolbar_customization#
// noinspection JSUnresolvedReference

function buildToolbar() {
  var ret =  {
    'sections': {
      'snippets': {
        'type': 'booklet',
        'label': 'Useful Snippets',
        'pages': {
          'section-syntaxhighlight': {
            'label': 'Syntaxhighlight',
            'layout': 'characters'
          }
        }
      }
    }
  }   ;
  var langs =["java","python","csharp","delphi","scala","xml","json","javascript","typescript","vb"];
  var langActions =[];
  langs.forEach(function(lang){
    langActions.push(buildLangAction(lang));
  });

  ret['sections']['snippets']['pages']['section-syntaxhighlight']['characters']=langActions;
  //debugger;
  
  return ret;
}

function buildLangAction(lang) {
  return addCharacterAction(
    '<syntaxhighlight lang="' + lang +'">',
    '</' + lang + '>',
    lang
  )
}

function addCharacterAction( pre,post, label) {
return {
  'action': {
    'type': 'encapsulate',
    'options': {
      'pre': pre,
      'peri': '',
      'post': post
    }
  },
   'label': label
  }
}

// Check if we're editing a page.
// noinspection JSUnresolvedReference
if ( [ 'edit', 'submit' ].indexOf( mw.config.get( 'wgAction' ) ) !== -1 ) {
	// Add a hook handler.
	mw.hook( 'wikiEditor.toolbarReady' ).add( function ( $textarea ) {
		// Configure a new toolbar entry on the given $textarea jQuery object.
    var toolbar = buildToolbar();
		$textarea.wikiEditor( 'addToToolbar', toolbar);
        // 'sections': {
        //   'snippets': {
        //     'type': 'booklet',
        //     'label': 'Useful Snippets',
        //     'pages': {
        //       'section-xml': {
        //         'label': 'XML Tags',
        //         'layout': 'characters',
        //         'characters': [
        //           '<references/>',
        //           {
        //             'action': {
        //               'type': 'encapsulate',
        //               'options': {
        //                 'pre': '<ref>',
        //                 'peri': '',
        //                 'post': '</ref>'
        //               }
        //             },
        //             'label': '<ref></ref>'
        //           }
        //         ]
        //       },
        //       'section-syntaxhighlight': {
        //         'label': 'Syntaxhighlight',
        //         'layout': 'characters',
        //         'characters': [
        //           addCharacterAction('<syntaxhighlight lang="java">','</syntaxhighlight>',"Java")
        //           ,
        //           {
        //             'action': {
        //               'type': 'encapsulate',
        //               'options': {
        //                 'pre': '[[Category:',
        //                 'peri': '',
        //                 'post': ']]'
        //               }
        //             },
        //             'label': '[[Category:]]'
        //           },
        //           {
        //             'action': {
        //               'type': 'encapsulate',
        //               'options': {
        //                 'pre': '[[File:',
        //                 'peri': '',
        //                 'post': ']]'
        //               }
        //             },
        //             'label': '[[File:]]'
        //           }
        //         ]
        //       }
        //     }
        //   }
        // }
    })
}

