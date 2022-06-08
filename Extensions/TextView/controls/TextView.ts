import { Application as app } from '@nativescript/core';
import { IControl } from 'mdk-core/controls/IControl';
import { BaseObservable } from 'mdk-core/observables/BaseObservable';


export class TextView extends IControl {

    protected _TextView: android.widget.TextView;
    private _observable: BaseObservable;

    public initialize(props) {
        super.initialize(props);
        if (app.android) {
          var that = this;
          this._TextView = new android.widget.TextView(this.androidContext());
          this._TextView.setText("Hola, es una prueba de texto nativo")
        }
      }
    
      public view(): any {
        if (app.android) {
          return this._TextView;
        }
      }
    
      public viewIsNative() {
        return true;
      }
    
      public observable() {
        if (!this._observable) {
          this._observable = new BaseObservable(this, this.definition(), this.page());
        }
        return this._observable;
      }
    
      public setContainer(container: IControl) {
        // do nothing
      }
    
      public setValue(value: any, notify: boolean, isTextValue?: boolean): Promise<any> {
        if (value != null && value != undefined && value instanceof Date) {
          //Store the value. The observable will trigger "OnValueChange" to the MDK app
          return this.observable().setValue(value, notify, isTextValue);
        }
        return Promise.resolve();
      }
    
    }