/**
 * @file mofron-comp-frmaccordion/index.js
 * @brief frame accordion component for mofron
 * @license MIT
 */
const Text      = require('mofron-comp-text');
const Accordion = require('mofron-comp-accordion');
const Frame     = require('mofron-comp-frame');
const Header    = require('mofron-comp-txtheader');
const loMargin  = require('mofron-layout-margin');
const HrzCenter = require('mofron-layout-hrzcenter');
const Fade      = require('mofron-effect-fade');
const Rotate    = require('mofron-effect-rotate');
const Height    = require('mofron-effect-height');
const Click     = require('mofron-event-click');
const ConfArg   = mofron.class.ConfArg;
const comutl    = mofron.util.common;

module.exports = class extends Accordion {
    /**
     * initialize component
     * 
     * @param (mixed) 
     *                key-value: component config
     * @short 
     * @type private
     */
    constructor (p1) {
        try {
            super();
            this.modname('frmAccordion');
            
	    /* init config */
            
	    if (0 < arguments.length) {
                this.config(p1);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    initDomConts () {
        try {
	    this.rootDom(new mofron.class.Dom("div",this));

            let title = new Text({ size:'0.2rem' });
            this.text(title);

            this.header().child([ this.indexArrow(), title ]);

            let conts = new mofron.class.Component({
                            effect: [
			        new Fade({ eid:2, value:false, speed:200 }),
				new Fade({ eid:3, value:true,  speed:200 }),
                            ]
	                });
            this.frame().child([ this.header(), conts ]);

	    this.child(this.frame());
	    this.childDom(conts.childDom());
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    frame (prm) {
        try {
            if (true === comutl.isinc(prm, 'Frame')) {
                //prm.height(null);
		prm.effect([
                    new Height({ eid:2, toHeight:'0.4rem', speed:200 }),
		    new Height({ eid:3, toHeight:'1rem',   speed:200 }),
		]);
            }
            return this.innerComp('frame', prm, Frame);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    headerClicked (h1,h2,h3) {
        try {
            
	} catch (e) {
            console.error(e.stack);
            throw e;
        } 
    }

    header (prm) {
        try {
            if (true === comutl.isinc(prm, 'Header')) {
	        let acc = this;
                prm.config({
                    style:  { 'position': null },
                    height: '0.4rem',
                    layout: new loMargin('left', '0.1rem'),
		    event: new Click(() => { acc.folding(!acc.folding()) })
                });
            }
            return this.innerComp('header', prm, Header);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    indexArrow (prm) {
        try {
            if (true === comutl.isinc(prm, 'Text')) {
                prm.config({
                    size:'0.2rem',text:'&#9660;',
                    effect: [
                        new Rotate({ value: -90, type: 'deg', eid:2, speed:200 }),
                        new Rotate({ value: 0,   type: 'deg', eid:3, speed:200 })
                    ]
                });
            }
            return this.innerComp('indexArrow', prm, Text);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    text (prm,cnf) {
        try {
            if ('string' === typeof prm) {
                this.text().text(prm);
                this.text().config(cnf);
                return;
            }
            return this.innerComp('text', prm, Text);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    title (prm) {
        try {
            return this.text(prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }


    folding (prm) {
        try {
            /* setter */
            if ( ("boolean" === typeof prm) && (prm !== this.folding()) ) {
                /* toggle folding */
		let eid = (true === prm) ? 2:3; 
                this.indexArrow().execEffect(eid);
		this.childDom().component().execEffect(eid);
		this.frame().execEffect(eid);
            }
            return this.confmng("folding", prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    width (prm, opt) {
        try {
            return this.frame().width(prm,opt);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    height (prm, opt) {
        try {
	    if (undefined !== prm) {
                this.frame().effect({ eid:3, modname:'Height' }).toHeight(prm);
	    }
            return this.frame().height(prm,opt);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    mainColor (prm, opt) {
        try {
            return this.header().baseColor(prm,opt);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
