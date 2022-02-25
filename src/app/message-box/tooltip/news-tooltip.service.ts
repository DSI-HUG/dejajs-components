import { Injectable, Type } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AbstractLazyModule, LazyLoaderService } from '@deja-js/component/core';
import { TooltipComponent } from '@deja-js/component/v2/tooltip/tooltip.component';
import { TooltipConfig } from '@deja-js/component/v2/tooltip/tooltip.model';
import { TooltipService } from '@deja-js/component/v2/tooltip/tooltip.service';

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

    protected getModule(): Promise<Type<AbstractLazyModule<TooltipComponent>>> {
        return import('../../common/news-card.module').then(m => m.NewsCardModule);
    }
}
