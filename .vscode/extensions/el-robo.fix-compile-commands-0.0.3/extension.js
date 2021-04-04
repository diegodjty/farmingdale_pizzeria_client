const vscode = require('vscode');
cmakeTools = vscode.extensions.getExtension( "vector-of-bool.cmake-tools" );
registered = false;

function register()
{
	if( !registered )
	{
		if( cmakeTools.isActive )
		{
			console.log( "[FixCompileCommands] Registering to reconfigure event" );
			
			cmakeTools.exports.reconfigured( () => 
			{
				fix_compile_commands();
			});
			
			registered = true;
		}
		else
		{
			setTimeout( register, 1000 );
		}
	}
}

function fix_compile_commands_for_path( commands_path )
{
	try
	{
		const fs = require( 'fs' );
		fs.readFile( commands_path, 'utf8', function (err,data) 
		{
			if( err )
			{
				console.log( err );
			}
			else
			{
				result = data.replace( /@<<(?:\r\n|\r|\n)/g, '' )
				result = result.replace( /(?:\r\n|\r|\n)<<"/g, '"' );
				result = result.replace( /\\\\/g, '/' );

				fs.writeFile( commands_path, result, 'utf8', function( err )
				{
					if( err )
					{
						console.log( err );
					}
				} );

				console.log( "Fixed " + commands_path );
			}
		} );
			
	}
	catch( error )
	{
		console.log( error );
	}
}

function fix_compile_commands()
{
	try
	{
		build_dir_config = vscode.workspace.getConfiguration( 'cmake' )[ 'buildDirectory' ];
		
		const fileUriToPath = require( 'file-uri-to-path' );

		vscode.workspace.workspaceFolders.forEach( folder => 
		{
			build_dir = build_dir_config.replace( "${workspaceRoot}", folder.uri );
			build_dir = build_dir.replace( "${workpaceFolder}", build_dir );

			commands_path = fileUriToPath( decodeURIComponent( build_dir + '/compile_commands.json' ) );
			fix_compile_commands_for_path( commands_path );
		} );
	}
	catch( error )
	{
		console.log( error );
	}
}

function activate(context) 
{
	console.log( "[FixCompileCommands] Activation" );
	let disposable = vscode.commands.registerCommand('cmake.fix_compile_commands', fix_compile_commands );
    context.subscriptions.push(disposable);
	
	register();
	fix_compile_commands();
}

function deactivate() 
{
}

exports.activate = activate;
exports.deactivate = deactivate;