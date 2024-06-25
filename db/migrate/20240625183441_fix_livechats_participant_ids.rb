class FixLivechatsParticipantIds < ActiveRecord::Migration[7.1]
  def change
    rename_column :livechats, :participant1_id_id, :participant1_id
    rename_column :livechats, :participant2_id_id, :participant2_id
  end
end
