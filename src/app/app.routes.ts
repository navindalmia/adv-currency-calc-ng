import { Routes } from '@angular/router';
import { ConversionHistoryComponent } from './conversion-history/conversion-history.component';
import { ConverterWrapperComponent } from './converter-wrapper/converter-wrapper.component';

export const routes: Routes = [
    {
        path: '',
        component: ConverterWrapperComponent,
        title: 'Converter'

    }
    , {
        path: 'history',
        component: ConversionHistoryComponent,
        title: 'History'

    }

];
