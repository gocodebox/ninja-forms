define( ['builder/views/drawerStagingCollection', 'builder/models/stagingCollection', 'builder/views/drawerFieldTypeSectionCollection', 'builder/views/drawerHeader', 'builder/models/fieldTypeCollection'], function( drawerStagingView, StagingCollection, fieldTypeSectionCollectionView, drawerHeaderView, fieldTypeCollection ) {

	var view = Marionette.LayoutView.extend( {
		template: '#nf-tmpl-drawer-content-add-field',

		regions: {
			staging: '#nf-drawer-staging .nf-reservoir',
			primary: '#nf-drawer-primary',
			secondary: '#nf-drawer-secondary'
		},

		initialize: function() {
			this.listenTo( nfRadio.channel( 'drawer' ), 'filter:fieldTypes', this.filterFieldTypes );
			this.listenTo( nfRadio.channel( 'drawer' ), 'clear:filter', this.removeFieldTypeFilter );
		
			this.savedCollection = nfRadio.channel( 'drawer' ).request( 'get:savedFields' );
			this.primaryCollection = this.savedCollection;

			this.fieldTypeSectionCollection = nfRadio.channel( 'drawer' ).request( 'get:fieldTypeSections' );
			this.secondaryCollection = this.fieldTypeSectionCollection;

		},

		onShow: function() {
			var stagingCollection = nfRadio.channel( 'data' ).request( 'get:stagedFields' );
			this.staging.show( new drawerStagingView( { collection: stagingCollection } ) );

			this.primary.show( new fieldTypeSectionCollectionView( { collection: this.primaryCollection } ) );
			this.secondary.show( new fieldTypeSectionCollectionView( { collection: this.secondaryCollection } ) );
		},

		getEl: function() {
			return jQuery( this.el ).parent();
		},

		filterFieldTypes: function( filteredSectionCollection ) {
			this.primary.reset();
			this.secondary.reset();
			this.filteredSectionCollection = filteredSectionCollection;
			this.primary.show( new fieldTypeSectionCollectionView( { collection: this.filteredSectionCollection } ) );
		},

		removeFieldTypeFilter: function () {
			this.primary.show( new fieldTypeSectionCollectionView( { collection: this.savedCollection } ) );
			this.secondary.show( new fieldTypeSectionCollectionView( { collection: this.fieldTypeSectionCollection } ) );
		}

	} );

	return view;
} );