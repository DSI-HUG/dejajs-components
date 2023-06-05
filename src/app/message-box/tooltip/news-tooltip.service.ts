import { Injectable, Type } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { AbstractLazyModule, LazyLoaderService } from '@deja-js/component/core';
import { TooltipComponentInterface, TooltipConfig, TooltipService } from '@deja-js/component/v2/tooltip';

import { News } from 'src/app/common/news.model';


@Injectable()
export class NewsTooltipService extends TooltipService<News> {
    public constructor(
        lazyLoaderService: LazyLoaderService,
        dialog: MatDialog
    ) {
        const toolTipConfig = new TooltipConfig<News>();
        toolTipConfig.minWidth = '800px';

        super(lazyLoaderService, dialog, toolTipConfig);
    }

    protected getModule(): Promise<Type<AbstractLazyModule<TooltipComponentInterface>>> {
        return import('../../common/news-card.module').then(m => m.NewsCardModule);
    }
}
